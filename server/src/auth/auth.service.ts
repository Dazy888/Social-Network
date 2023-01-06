import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { Model } from "mongoose"
import { v4 } from "uuid"
// NestJS
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
// Schemas
import { User, UserDocument } from "./schemas/user.schema"
import { Tokens, TokensDocument } from "./schemas/tokens.schema"
import { Posts, PostsDocument } from "./schemas/posts.schema"
// DTO
import { UserDto } from "./dto/user.dto"
// Interfaces
import { TokensResponse } from "./types/auth-types"

dotenv.config()
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Tokens.name) private tokensModel: Model<TokensDocument>, @InjectModel(Posts.name) private postsModel: Model<PostsDocument>) {}
    generateTokens(payload): TokensResponse {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }
    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }
    async saveToken(id: string, refreshToken: string) {
        const tokenData = await this.tokensModel.findOne({ user: id })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            tokenData.save()
        } else {
            await this.tokensModel.create({ user:id, refreshToken })
        }
    }
    async removeToken(refreshToken: string) {
        return this.tokensModel.deleteOne({refreshToken})
    }
    async findToken(refreshToken: string) {
        return this.tokensModel.findOne({refreshToken})
    }

    // async humanValidation(token: string) {
    //     const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
    //     return !response.data.success
    // }
    async registration(login: string, password: string, /*token: string*/): Promise<any> {
        // if (await this.humanValidation(token)) return `Don't fool us bot`
        if (await this.userModel.findOne({userLogin: login})) return 'User with this login already exists'

        const hashPassword = await bcrypt.hash(password, 3)
        const userNumber = Math.floor(Math.random() * 100)
        const user = await this.userModel.create({userLogin: login, password: hashPassword, name: `User ${userNumber}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: 'This project was made by David Hutsenko', skills: 'This project was made by David Hutsenko', hobbies: 'This project was made by David Hutsenko', isActivated: false, userId: v4(), email: null, followers: [], following: [], activationLink: null})

        const userDto = new UserDto(user)
        const tokens = this.generateTokens({...userDto})
        await this.saveToken(userDto.userId, tokens.refreshToken)

        return {
            tokens,
            user: userDto
        }
    }
    async login(login: string, password: string, /*token: string*/): Promise<any> {
        // if (await this.humanValidation(token)) return `Don't fool us bot`
        const user = await this.userModel.findOne({userLogin: login})
        if (!user) return `User with this login doesn't exist`
        const userDto = new UserDto(user)

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) return 'Wrong password'

        const posts = await this.postsModel.find({user: user.id})

        const tokens = this.generateTokens({...userDto})
        await this.saveToken(userDto.userId, tokens.refreshToken)

        return {
            tokens,
            user: userDto,
            posts
        }
    }
    async logout(refreshToken: string): Promise<any> {
        return this.removeToken(refreshToken)
    }
    async refresh(refreshToken: string) {
        // console.log(refreshToken)

        if (!refreshToken) return 'User is not authorized'

        const userData = this.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.findToken(refreshToken)

        if (!userData || !tokenFromDb) return 'User is not authorized'

        const user = await this.userModel.findOne({userId: userData.userId})
        const posts = await this.postsModel.find({user: userData.userId})

        const userDto = new UserDto(user)
        const tokens = this.generateTokens({...userDto})

        return {
            tokens,
            user: userDto,
            posts
        }
    }
}