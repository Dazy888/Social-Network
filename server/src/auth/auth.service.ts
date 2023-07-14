import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { TokenDocument } from "../schemas/token.schema"
import { PostDocument } from "../schemas/post.schema"
import { ProfileDocument } from "../schemas/profile.schema"
import { SubscriptionDocument } from "../schemas/subscription.schema"

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private usersModel: Model<UserDocument>, @InjectModel('Token') private tokensModel: Model<TokenDocument>,
        @InjectModel('Post') private postsModel: Model<PostDocument>, @InjectModel('Profile') private profilesModel: Model<ProfileDocument>,
        @InjectModel('Subscription') private subscriptionsModel: Model<SubscriptionDocument>
    ) {}

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId: string, refreshToken: string) {
        await this.tokensModel.create({ userId, refreshToken })
    }

    async registration(userName: string, pass: string) {
        const existingUser: UserDocument | null = await this.usersModel.findOne({ userName })
        if (existingUser) throw new BadRequestException('User with this login already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)

        const user: UserDocument = await this.usersModel.create({ userName, pass: hashedPassword, })

        const userNumber = Math.floor(Math.random() * 100)
        const profile: ProfileDocument = await this.profilesModel.create({ name: `User_${userNumber}`, userId: user.id })

        const tokens = this.generateTokens({ id: user.id })
        await this.saveToken(user.id, tokens.refreshToken)

        return {
            tokens,
            user: {
                id: user.id,
                isEmailActivated: user.isEmailActivated,
                email: user.email,
                name: profile.name,
                location: profile.location,
                banner: profile.banner,
                avatar: profile.avatar,
                aboutMe: profile.aboutMe,
                skills: profile.skills,
                hobbies: profile.hobbies,
            }
        }
    }

    async getUserData(id: string, isEmailActivated: boolean, email: string | null) {
        const profile: ProfileDocument = await this.profilesModel.findOne({ userId: id }, { name: 1, location: 1, avatar: 1, banner: 1, aboutMe: 1, skills: 1, hobbies: 1, _id: 0 }).lean()
        const posts: PostDocument[] = await this.postsModel.find({ userId: id })
        const followers = await this.subscriptionsModel.find({ followedUserId: id }, { userId: 1, _id: 0 })
        const followings = await this.subscriptionsModel.find({ userId: id }, { followedUserId: 1, _id: 0 })

        const followersIds = followers.map((follower) => follower.userId)
        const followingsIds = followings.map((following) => following.followedUserId)

        return {
            id,
            isEmailActivated,
            email,
            ...profile,
            posts,
            subscriptions: {
                followers: followersIds,
                followings: followingsIds
            }
        }
    }

    async login(userName: string, pass: string) {
        const user: UserDocument | null = await this.usersModel.findOne({ userName })
        if (!user) throw new UnauthorizedException('Invalid login or password')

        const isPassEquals = await bcrypt.compare(pass, user.pass)
        if (!isPassEquals) throw new UnauthorizedException('Invalid login or password')

        const tokens = this.generateTokens({ id: user.id })
        await this.saveToken(user.id, tokens.refreshToken)

        const userData = await this.getUserData(user.id, user.isEmailActivated, user.email)
        return { tokens, user: userData }
    }

    async logout(refreshToken: string) {
        await this.tokensModel.deleteOne({ refreshToken })
    }

    async refresh(refreshToken: string) {
        const { id } = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        const tokenFromDb: TokenDocument | null = await this.tokensModel.findOne({ refreshToken })

        if (!id || !tokenFromDb) throw new BadRequestException('User is not authorized')

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        await this.tokensModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } })

        const user: UserDocument = await this.usersModel.findOne({ id }, { isEmailActivated: 1, email: 1, _id: 0 }).lean()
        const userData = await this.getUserData(id, user.isEmailActivated, user.email)

        return {
            accessToken: jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: userData
        }
    }
}
