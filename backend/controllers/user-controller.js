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
            const {name, currentName} = req.body

            const user = await UserModel.findOne({name})
            if (user) {
                res.status(400)
                res.json(`User with this name already exists`)
                return
            }
            const userData = await UserService.changeName(name, currentName)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, currentName} = req.body
            const userData = await UserService.changeLocation(location, currentName)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()