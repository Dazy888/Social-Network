// Libraries
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'
// Models
import {UserModel} from "../models/user-model.js"
import {UserDto} from "../dtos/user-dto.js"
// Services
import MailService from "./mail-service.js"
import TokenService from "./token-service.js"
import {ApiError} from "../exceptions/api-error.js"
import axios from "axios";

class UserService {
    async humanValidation(token) {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
        if (!response.data.success) throw ApiError.BadRequest("Don't fool us bot")
    }

    async registration(login, password) {
        const hashPassword = await bcrypt.hash(password, 3)
        // const activationLink = uuidv4()
        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const user = await UserModel.create({login, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
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

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
}

export default new UserService()