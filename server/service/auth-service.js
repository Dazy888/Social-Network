// Libraries
import bcrypt from "bcrypt"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
// Models
import {UserModel} from "../models/user-model.js"
import {UserDto} from "../dtos/user-dto.js"
// Services
import MailService from "./mail-service.js"
import TokenService from "./token-service.js"
import {ApiError} from "../exceptions/api-error.js"

class AuthService {
    async humanValidation(token) {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
        if (!response.data.success) throw ApiError.BadRequest("Don't fool us bot")
    }

    async registration(userLogin, password) {
        const hashPassword = await bcrypt.hash(password, 3)
        const userId = Math.floor(Math.random() * 100)

        const user = await UserModel.create({userLogin, password: hashPassword, name: `User ${userId}`, location: 'Nowhere', banner: 'https://img.freepik.com/premium-vector/programming-code-made-with-binary-code-coding-hacker-background-digital-binary-data-streaming-digital-code_127544-778.jpg?w=2000', avatar: 'https://i.imgur.com/b08hxPY.png', aboutMe: '', skills: '', hobbies: '', posts: [], photographs: []})

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(login) {
        const user = await UserModel.findOne({login})
        const userDto = new UserDto(user)

        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService()