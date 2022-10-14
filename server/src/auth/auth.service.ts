import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { Injectable } from '@nestjs/common'
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"
import {User, UserDocument} from "./schema/user.schema"
import axios from "axios"
import {UserDto} from "./dto/user.dto";
import {Tokens, TokensDocument} from "../products/schemas/tokens.schema";
import * as dotenv from "dotenv"

dotenv.config()

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Tokens.name) private tokensModel: Model<TokensDocument>) {}

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(id, refreshToken) {
        const tokenData = await this.tokensModel.findOne({ user: id })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            tokenData.save()
        } else {
            await this.tokensModel.create({ user:id, refreshToken })
        }
    }

    async removeToken(refreshToken) {
        return this.tokensModel.deleteOne({refreshToken})
    }

    async findToken(refreshToken) {
        return this.tokensModel.findOne({refreshToken})
    }

    async humanValidation(token) {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
        return !response.data.success
    }

    async registration(login: string, password: string, token: string) {
        if (await this.humanValidation(token)) return `Don't fool us bot`

        const hashPassword = await bcrypt.hash(password, 3)
        const userId = Math.floor(Math.random() * 100)
        const user = await this.userModel.create({userLogin: login, password: hashPassword, name: `User ${userId}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: '', skills: '', hobbies: ''})

        const userDto = new UserDto(user)
        const tokens = this.generateTokens({...userDto})
        await this.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}
