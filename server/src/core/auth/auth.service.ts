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
import { FollowDocument } from "../../schemas/follow.schema"

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Token') private tokenModel: Model<TokenDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>,
        @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Follow') private followModel: Model<FollowDocument>
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
        if (existingUser) throw new BadRequestException('User with this name already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)

        const { id, activatedEmail, email }: UserDocument = await this.userModel.create({
            username,
            password: hashedPassword
        })

        const userNumber = Math.floor(Math.random() * 10000)
        const { name, location, banner, avatar, aboutUserText, userSkillsText, userHobbiesText }: ProfileDocument = await this.profileModel.create({
            name: `User_${userNumber}`,
            userId: id
        })

        const tokens = this.generateTokens({ id })
        await this.saveToken(id, tokens.refreshToken)

        return {
            tokens,
            user: {
                id,
                activatedEmail,
                email,
                name,
                location,
                banner,
                avatar,
                aboutUserText,
                userSkillsText,
                userHobbiesText,
            }
        }
    }

    async getUserData(id: string) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId: id })
        const posts: PostDocument[] = await this.postModel.find({ userId: id })
        const followers = await this.followModel.find({ followedUserId: id })
        const followings = await this.followModel.find({ userId: id })

        const followersIds = followers.map((follower) => follower.followerId)
        const followingsIds = followings.map((following) => following.followeeId)

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
        const user: UserDocument | null = await this.userModel.findOne({ username })
        if (!user) throw new UnauthorizedException('Invalid username or password')

        const isPassEquals = await bcrypt.compare(pass, user.password)
        if (!isPassEquals) throw new UnauthorizedException('Invalid username or password')

        const tokens = this.generateTokens({...user})
        await this.saveToken(user.id, tokens.refreshToken)

        const userData = await this.getUserData(user.id)
        return {
            tokens,
            user: {
                ...userData,
                activatedEmail: user.activatedEmail,
                email: user.email
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

        const { activatedEmail, email }: UserDocument = await this.userModel.findOne({ id })
        const userData = await this.getUserData(id)

        return {
            accessToken: jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: {
                ...userData,
                activatedEmail,
                email
            }
        }
    }
}
