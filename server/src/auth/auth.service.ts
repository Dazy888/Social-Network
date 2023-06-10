import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserDto } from "./dto/user.dto"
import { User } from "../interfaces/auth.interfaces"
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

    createUser(user: User) {
        return {
            isActivated: user.isActivated,
            name: user.name,
            location: user.location,
            avatar: user.avatar,
            banner: user.banner,
            aboutMe: user.aboutMe,
            skills: user.skills,
            hobbies: user.hobbies,
            email: user.email,
            followers: user.followers,
            following: user.following,
            activationLink: user.activationLink
        }
    }

    async registration(login: string, password: string) {
        const existingUser = await this.userModel.findOne({ login })
        if (existingUser) throw new BadRequestException('User with this login already exists')

        const hashPassword = await bcrypt.hash(password, 10)
        const userNumber = Math.floor(Math.random() * 100)

        const user = await this.userModel.create({ login, password: hashPassword, name: `User ${userNumber}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: 'This project was made by David Hutsenko', skills: 'This project was made by David Hutsenko', hobbies: 'This project was made by David Hutsenko', isActivated: false, email: null, followers: [], following: [], activationLink: null })
        const userDto: any = new UserDto(user)

        const tokens = this.generateTokens({ ...userDto })
        await this.saveToken(user.id, tokens.refreshToken)

        return { tokens, user: this.createUser(userDto) }
    }

    async login(login: string, password: string) {
        const existingUser = await this.userModel.findOne({ login })
        if (!existingUser) throw new UnauthorizedException('Invalid login or password')

        const userDto = new UserDto(existingUser)

        const isPassEquals = await bcrypt.compare(password, existingUser.password)
        if (!isPassEquals) throw new UnauthorizedException('Invalid login or password')

        const posts = await this.postModel.find({ userId: existingUser.id })
        const tokens = this.generateTokens({ ...userDto })

        await this.saveToken(existingUser.id, tokens.refreshToken)
        return { tokens, user: userDto, posts }
    }

    async logout(refreshToken: string) {
        return this.tokenModel.deleteOne({ refreshToken })
    }

    async refresh(refreshToken: string) {
        const userData: any = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        const tokenFromDb = await this.tokenModel.findOne({ refreshToken })
        if (!userData || !tokenFromDb) throw new BadRequestException('User is not authorized')

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        await this.tokenModel.deleteMany({ createdAt: { $lt: thirtyDaysAgo } })

        const user = await this.userModel.findOne({ userId: userData.id })
        const posts = await this.postModel.find({ userId: userData.id })
        const userDto = new UserDto(user)
        const tokens = this.generateTokens({ ...userDto })

        return { tokens, user: userDto, posts }
    }
}
