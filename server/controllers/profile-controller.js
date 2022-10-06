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

            const newName = await ProfileService.changeName(name, id)
            res.json(newName)
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, id} = req.body
            const newLocation = await ProfileService.changeLocation(location, id)
            res.json(newLocation)
        } catch (e) {
            next(e)
        }
    }

    async changeBanner(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await ProfileService.changeBanner(path, id, currentPath)
            res.json(newPath)
        } catch (e) {
            next(e)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await ProfileService.changAvatar(path, id, currentPath)
            res.json(newPath)
        } catch (e) {
            next(e)
        }
    }

    async changeAboutMe(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeAboutMe(text, id)
            res.json(newText)
        } catch (e) {
            next(e)
        }
    }

    async changeHobbies(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeHobbies(text, id)
            res.json(newText)
        } catch (e) {
            next(e)
        }  }

    async changeSkills(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeSkills(text, id)
            res.json(newText)
        } catch (e) {
            next(e)
        }
    }

    async addPost(req, res, next) {
        try {
            const {text, id} = req.body
            const newPost = await ProfileService.addPost(text, id)
            res.json(newPost)
        } catch (e) {
            next(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const {id, userId} = req.params
            const newPosts = await ProfileService.deletePost(id, userId)
            res.json(newPosts)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProfileController()