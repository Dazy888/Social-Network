// Libraries
import dotenv from "dotenv"
import bcrypt from "bcrypt"
// Service
import AuthService from "../service/auth-service.js"
// Model
import {UserModel}  from "../models/user-model.js"
// Errors
import {ServerErrors} from "../exceptions/api-error.js"

dotenv.config()

class AuthController {
    async registration(req, res, next) {
        try {
            const {userLogin, password, token} = req.body
            await AuthService.humanValidation(res, token)
            if (await UserModel.findOne({userLogin})) ServerErrors.BadRequest(res, 'User with this login already exists')

            const userData = await AuthService.registration(userLogin, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {userLogin, password, token} = req.body
            await AuthService.humanValidation(res, token)

            const user = await UserModel.findOne({userLogin})
            if (!user) ServerErrors.BadRequest(`User with this login doesn't exist`)

            const isPassEquals = await bcrypt.compare(password, user.password)
            if (!isPassEquals) ServerErrors.BadRequest('Wrong password')

            const userData = await AuthService.login(userLogin)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            res.clearCookie('refreshToken')
            res.json(await AuthService.logout(refreshToken))
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(await AuthService.refresh(res, refreshToken))
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()