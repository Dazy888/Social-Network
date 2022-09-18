
import dotenv from "dotenv"
import UserService  from "../service/user-service.js"
import {UserModel}  from "../models/user-model.js"

dotenv.config()

class UserController {
    async activate(req, res, next) {
        try {
            await UserService.activate(req.params.link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async changeName(req, res, next) {
        try {
            const {name, id} = req.body

            const user = await UserModel.findOne({name})
            if (user) {
                res.status(400)
                res.json(`User with this name already exists`)
                return
            }
            const userData = await UserService.changeName(name, id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, id} = req.body
            const userData = await UserService.changeLocation(location, id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeBanner(req, res, next) {
        try {
            console.log(req.file)
            console.log(req.body.id)
        } catch (e) {
            next(e)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            console.log(req.file)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()