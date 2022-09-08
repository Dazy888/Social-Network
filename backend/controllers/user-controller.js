// Libraries
import dotenv from "dotenv"
import bcrypt from "bcrypt"
// Services
import UserService from "../service/user-service.js"
// Models
import {UserModel} from "../models/user-model.js"

dotenv.config()

class UserController {
    async registration(req, res, next) {
        try {
            const {login, password, token} = req.body
            await UserService.humanValidation(token)

            if (await UserModel.findOne({login})) {
                res.status(400)
                res.json(`User with this login already exists`)
                return
            }

            const userData = await UserService.registration(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {login, password, token} = req.body
            await UserService.humanValidation(token)

            const user = await UserModel.findOne({login})
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

            const userData = await UserService.login(login)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)

            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            await UserService.activate(req.params.link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)

            res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()