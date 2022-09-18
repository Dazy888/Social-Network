// Libraries
import dotenv from "dotenv"
import bcrypt from "bcrypt"
// Service
import AuthService from "../service/auth-service.js"
// Model
import {UserModel}  from "../models/user-model.js"

dotenv.config()

class AuthController {
    async registration(req, res, next) {
        try {
            const {userLogin, password, token} = req.body
            await AuthService.humanValidation(token)

            if (await UserModel.findOne({userLogin})) {
                res.status(400)
                res.json(`User with this login already exists`)
                return
            }

            const userData = await AuthService.registration(userLogin, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {userLogin, password, token} = req.body
            await AuthService.humanValidation(token)

            const user = await UserModel.findOne({userLogin})
            if (!user) {
                res.status(400)
                res.json(`User with this login doesn't exist`)
                return
            }

            const isPassEquals = await bcrypt.compare(password, user.password)
            if (!isPassEquals) {
                res.status(400)
                res.json('Wrong password')
                return
            }

            const userData = await AuthService.login(userLogin)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await AuthService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthService.refresh(refreshToken)

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()