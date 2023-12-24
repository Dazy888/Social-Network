import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
// Schemas
import { UserDocument } from "../../schemas/user.schema"
import { TokenDocument } from "../../schemas/token.schema"
import { PostDocument } from "../../schemas/post.schema"
import { ProfileDocument } from "../../schemas/profile.schema"
import { SubscriptionDocument } from "../../schemas/follow.schema"

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Token') private tokenModel: Model<TokenDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>,
        @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Subscription') private subscriptionModel: Model<SubscriptionDocument>
    ) {}

    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        await this.tokenModel.create({
            userId,
            refreshToken
        })
    }

    async signUp(username: string, pass: string) {
        const existingUser: UserDocument | null = await this.userModel.findOne({ username })
        if (existingUser) throw new BadRequestException('User with that name already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)

        const { id, isEmailActivated, email }: UserDocument = await this.userModel.create({
            username,
            pass: hashedPassword
        })

        const userNumber = Math.floor(Math.random() * 10000)
        const { name, location, banner, avatar, aboutMe, skills, hobbies }: ProfileDocument = await this.profileModel.create({
            name: `User_${userNumber}`,
            userId: id
        })

        const tokens = this.generateTokens({ id })
        await this.saveToken(id, tokens.refreshToken)

        return {
            tokens,
            user: {
                id,
                isEmailActivated,
                email,
                name,
                location,
                banner,
                avatar,
                aboutMe,
                skills,
                hobbies,
            }
        }
    }

    async getUserData(id: string) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId: id })
        const posts: PostDocument[] = await this.postModel.find({ userId: id })
        const followers = await this.subscriptionModel.find({ followedUserId: id })
        const followings = await this.subscriptionModel.find({ userId: id })

        const followersIds = followers.map((follower) => follower.userId)
        const followingsIds = followings.map((following) => following.followedUserId)

        return {
            id,
            profile,
            posts,
            subscriptions: {
                followers: followersIds,
                followings: followingsIds
            }
        }
    }

    async signIn(username: string, pass: string) {
        const { id, isEmailActivated, email, pass:currentPass }: UserDocument | null = await this.userModel.findOne({ username })
        if (!id) throw new UnauthorizedException('Invalid name or password')

        const isPassEquals = await bcrypt.compare(pass, currentPass)
        if (!isPassEquals) throw new UnauthorizedException('Invalid username or password')

        const tokens = this.generateTokens({ id })
        await this.saveToken(id, tokens.refreshToken)

        const userData = await this.getUserData(id)
        return {
            tokens,
            user: {
                ...userData,
                isEmailActivated,
                email
            }
        }
    }

    async signOut(refreshToken: string) {
        await this.tokenModel.deleteOne({ refreshToken })
    }

    async refresh(refreshToken: string) {
        const { id } = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        if (!id) throw new BadRequestException('User is not authorized')

        const tokenFromDb: TokenDocument | null = await this.tokenModel.findOne({ refreshToken })
        if (!tokenFromDb) throw new BadRequestException('User is not authorized')

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        await this.tokenModel.deleteMany({
            createdAt: {
                $lt: thirtyDaysAgo
            }
        })

        const { isEmailActivated, email }: UserDocument = await this.userModel.findOne({ id })
        const userData = await this.getUserData(id)

        return {
            accessToken: jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: {
                ...userData,
                isEmailActivated,
                email
            }
        }
    }
}
