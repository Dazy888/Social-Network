import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserDto } from "./dtos/user.dto"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { TokenDocument } from "../schemas/token.schema"
import { PostDocument } from "../schemas/post.schema"
import { ProfileDocument } from "../schemas/profile.schema"

dotenv.config()

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Token') private tokenModel: Model<TokenDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Profile') private profileModel: Model<ProfileDocument>
    ) {}

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId: string, refreshToken: string) {
        await this.tokenModel.create({ userId, refreshToken })
    }

    createUser(user: UserDocument) {
        return {
            id: user.id,
            isActivated: user.isActivated,
            activationLink: user.activationLink,
            email: user.email,
        }
    }

    async registration(userName: string, pass: string) {
        const existingUser: UserDocument | null = await this.userModel.findOne({ userName })
        if (existingUser) throw new BadRequestException('UserInfo with this login already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)

        const user: UserDocument = await this.userModel.create({ userName, pass: hashedPassword, })

        const userNumber = Math.floor(Math.random() * 100)
        const profile: ProfileDocument = await this.profileModel.create({ name: `User_${userNumber}`, userId: user.id })
        delete profile.userId

        const userDto = new UserDto(user)

        const tokens = this.generateTokens({ ...userDto })
        await this.saveToken(user.id, tokens.refreshToken)

        return {
            tokens,
            user: {
                ...this.createUser(user),
                ...profile
            }
        }
    }

    async login(userName: string, pass: string) {
        const user: UserDocument | null = await this.userModel.findOne({ userName })
        if (!user) throw new UnauthorizedException('Invalid login or password')

        const isPassEquals = await bcrypt.compare(pass, user.pass)
        if (!isPassEquals) throw new UnauthorizedException('Invalid login or password')

        const userDto = new UserDto(user)
        const posts = await this.postModel.find({ userId: user.id })

        const tokens = this.generateTokens({ ...userDto })
        await this.saveToken(user.id, tokens.refreshToken)

        const profile: ProfileDocument = await this.profileModel.findOne({ userId: user.id })
        delete profile.userId

        return {
            tokens,
            user: {
                ...this.createUser(user),
                ...profile
            },
            posts
        }
    }

    async logout(refreshToken: string) {
        return this.tokenModel.deleteOne({ refreshToken })
    }

    async refresh(refreshToken: string) {
        const userData: UserDocument = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        const tokenFromDb = await this.tokenModel.findOne({ refreshToken })

        if (!userData || !tokenFromDb) throw new BadRequestException('UserInfo is not authorized')

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        await this.tokenModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } })

        const user: UserDocument = await this.userModel.findOne({ login: userData.userName })
        const posts: PostDocument[] = await this.postModel.find({ userId: user.id })
        const profile: ProfileDocument = await this.profileModel.findOne({ userId: user.id })
        delete profile.userId

        return {
            accessToken: jwt.sign({ ...user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: {
                ...this.createUser(user),
                ...profile
            },
            posts
        }
    }
}
