import {UserModel} from "../models/user-model.js"
import bcrypt from "bcrypt"
import MailService from "./mail-service.js"
import TokenService from "./token-service.js"
import UserDto from "../dtos/user-dto.js"
import { v4 as uuidv4 } from 'uuid'
import {ApiError} from "../exceptions/api-error.js"

class UserService {
    async registration(email, password) {
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

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
        await user.save()
    }

    async login(email) {
        const user = await UserModel.findOne({email})
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