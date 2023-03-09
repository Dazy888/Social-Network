import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Model } from "mongoose"
import { v4 } from "uuid"
// NestJS
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
// Schemas
import { UserDocument } from "@/schemas/user.schema"
import { TokenDocument } from "@/schemas/token.schema"
import { PostDocument } from "@/schemas/post.schema"
// DTO
import { UserDto } from "@/dto/auth/user.dto"
// Interfaces
import { FindTokenResponse, ITokens, RefreshResponse, RegistrationResponse } from "@/interfaces/auth.interfaces"

dotenv.config()

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Token') private tokenModel: Model<TokenDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    generateTokens(payload): ITokens {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    validateRefreshToken(token: string) {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({ userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            tokenData.save()
        } else {
            await this.tokenModel.create({ userId, refreshToken })
        }
    }

    async deleteToken(refreshToken: string) {
        return this.tokenModel.deleteOne({ refreshToken })
    }

    async findToken(refreshToken: string): Promise<FindTokenResponse> {
        return this.tokenModel.findOne({ refreshToken })
    }

    // async humanValidation(token: string) {
    //     const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
    //     return !response.data.success
    // }

    async registration(login: string, password: string, /*token: string*/): Promise<RegistrationResponse | string> {
        // if (await this.humanValidation(token)) return `Don't fool us bot`
        const existingUser = await this.userModel.findOne({ userLogin: login })

        if (existingUser) {
            return 'User with this login already exists'
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const userNumber = Math.floor(Math.random() * 100)

            const user = await this.userModel.create({ userLogin: login, password: hashPassword, name: `User ${userNumber}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: 'This project was made by David Hutsenko', skills: 'This project was made by David Hutsenko', hobbies: 'This project was made by David Hutsenko', isActivated: false, userId: v4(), email: null, followers: [], following: [], activationLink: null })
            const userDto = new UserDto(user)

            const tokens = this.generateTokens({ ...userDto })
            await this.saveToken(userDto.userId, tokens.refreshToken)

            return { tokens, user: userDto }
        }
    }

    async login(login: string, password: string, /*token: string*/): Promise<RefreshResponse | string> {
        // if (await this.humanValidation(token)) return `Don't fool us bot`
        const existingUser = await this.userModel.findOne({ userLogin: login })

        if (!existingUser) {
            return "User with this login doesn't exist"
        } else {
            const userDto = new UserDto(existingUser)
            const isPassEquals = await bcrypt.compare(password, existingUser.password)

            if (!isPassEquals) {
                return 'Wrong password'
            } else {
                const posts = await this.postModel.find({ userId: existingUser.userId })
                const tokens = this.generateTokens({ ...userDto })

                await this.saveToken(userDto.userId, tokens.refreshToken)

                return { tokens, user: userDto, posts }
            }
        }
    }

    async logout(refreshToken: string) {
        return this.deleteToken(refreshToken)
    }

    async refresh(refreshToken: string): Promise<RefreshResponse | string> {
        if (!refreshToken) {
            return 'User is not authorized'
        } else {
            const userData = this.validateRefreshToken(refreshToken)
            const tokenFromDb = await this.findToken(refreshToken)

            if (!userData || !tokenFromDb) {
                return 'User is not authorized'
            } else {
                const user = await this.userModel.findOne({ userId: userData.userId })
                const posts = await this.postModel.find({ userId: userData.userId })

                const userDto = new UserDto(user)
                const tokens = this.generateTokens({ ...userDto })

                return { tokens, user: userDto, posts }
            }
        }
    }
}
