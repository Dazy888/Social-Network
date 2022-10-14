import dotenv from "dotenv"
import {UserModel}  from "../models/user-model.js"
import ProfileService from "../service/profile-service.js"
import {ServerErrors} from "../exceptions/api-error.js"

dotenv.config()

class ProfileController {
    async changeName(req, res, next) {
        try {
            const {name, id} = req.body
            const user = await UserModel.findOne({name})
            if (user) ServerErrors.BadRequest(res, 'User with this name already exists')
            res.json(await ProfileService.changeName(name, id))
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, id} = req.body
            res.json(await ProfileService.changeLocation(location, id))
        } catch (e) {
            next(e)
        }
    }

    async changeBanner(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            res.json(await ProfileService.changeBanner(path, id, currentPath))
        } catch (e) {
            next(e)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            res.json(await ProfileService.changAvatar(path, id, currentPath))
        } catch (e) {
            next(e)
        }
    }

    async changeAboutMe(req, res, next) {
        try {
            const {text, id} = req.body
            res.json(await ProfileService.changeAboutMe(text, id))
        } catch (e) {
            next(e)
        }
    }

    async changeHobbies(req, res, next) {
        try {
            const {text, id} = req.body
            res.json(await ProfileService.changeHobbies(text, id))
        } catch (e) {
            next(e)
        }  }

    async changeSkills(req, res, next) {
        try {
            const {text, id} = req.body
            res.json(await ProfileService.changeSkills(text, id))
        } catch (e) {
            next(e)
        }
    }

    async createPost(req, res, next) {
        try {
            const {text, id} = req.body
            res.json(await ProfileService.createPost(text, id))
        } catch (e) {
            next(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const {id, userId} = req.params
            res.json(await ProfileService.deletePost(id, userId))
        } catch (e) {
            next(e)
        }
    }
}

export default new ProfileController()