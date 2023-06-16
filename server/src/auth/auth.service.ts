import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserDto } from "./dto/user.dto"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { TokenDocument } from "../schemas/token.schema"
import { PostDocument } from "../schemas/post.schema"

dotenv.config()

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret)

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Token') private tokenModel: Model<TokenDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

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
            name: user.name,
            location: user.location,
            banner: user.banner,
            avatar: user.avatar,
            aboutMe: user.aboutMe,
            skills: user.skills,
            hobbies: user.hobbies,
            followers: user.followers,
            following: user.following,
        }
    }

    async registration(login: string, pass: string) {
        const existingUser = await this.userModel.findOne({ login })
        if (existingUser) throw new BadRequestException('UserInfo with this login already exists')

        const hashedPassword = await bcrypt.hash(pass, 10)
        const userNumber = Math.floor(Math.random() * 100)

        const user = await this.userModel.create({ login, pass: hashedPassword, name: `User ${userNumber}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: 'This project was made by David Hutsenko', skills: 'This project was made by David Hutsenko', hobbies: 'This project was made by David Hutsenko', isActivated: false, email: null, followers: [], following: [], activationLink: null })

        const tokens = this.generateTokens({ ...user })
        await this.saveToken(user.id, tokens.refreshToken)

        return { tokens, user: this.createUser(user) }
    }

    async login(login: string, pass: string) {
        const user = await this.userModel.findOne({ login })
        if (!user) throw new UnauthorizedException('Invalid login or password')

        const isPassEquals = await bcrypt.compare(pass, user.pass)
        if (!isPassEquals) throw new UnauthorizedException('Invalid login or password')

        const userDto = new UserDto(user)
        const posts = await this.postModel.find({ userId: user.id })

        const tokens = this.generateTokens({ ...userDto })
        await this.saveToken(user.id, tokens.refreshToken)

        return { tokens, user: this.createUser(user), posts }
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

        const user = await this.userModel.findOne({ login: userData.login })
        const posts = await this.postModel.find({ userId: user.id })

        return {
            accessToken: jwt.sign({ ...user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' }),
            user: this.createUser(user),
            posts
        }
    }
}
