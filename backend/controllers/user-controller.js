import UserService from "../service/user-service.js";
import dotenv from "dotenv"
import {validationResult} from "express-validator"
import {UserModel} from "../models/user-model.js";
import bcrypt from "bcrypt";

dotenv.config()

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) res.json(errors.array()[0].param)

            const {email, password} = req.body
            if (await UserModel.findOne({email})) res.json(`User with this email already exists`)
            const userData = await UserService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const user = await UserModel.findOne({email})
            if (!user) res.json(`User with this email doesn't exist`)

            const isPassEquals = await bcrypt.compare(password, user.password)
            if (!isPassEquals) res.json('Invalid password')

            const userData = await UserService.login(email)

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
            const activationLink = req.params.link
            await UserService.activate(activationLink)
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


// if (errors) return next(ApiError.BadRequest('Validation error', errors.array()))