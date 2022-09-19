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
            const newName = await UserService.changeName(name, id)
            return res.json(newName)
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, id} = req.body
            const newLocation = await UserService.changeLocation(location, id)
            return res.json(newLocation)
        } catch (e) {
            next(e)
        }
    }

    async changeBanner(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await UserService.changeBanner(path, id, currentPath)
            return res.json(newPath)
        } catch (e) {
            next(e)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await UserService.changAvatar(path, id, currentPath)
            return res.json(newPath)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()