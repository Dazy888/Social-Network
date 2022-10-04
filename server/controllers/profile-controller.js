import dotenv from "dotenv"
import {UserModel}  from "../models/user-model.js"
import ProfileService from "../service/profile-service.js";

dotenv.config()

class ProfileController {
    async changeName(req, res, next) {
        try {
            const {name, id} = req.body

            const user = await UserModel.findOne({name})
            if (user) {
                res.status(400)
                res.json(`User with this name already exists`)
                return
            }
            const newName = await ProfileService.changeName(name, id)
            return res.json(newName)
        } catch (e) {
            next(e)
        }
    }

    async changeLocation(req, res, next) {
        try {
            const {location, id} = req.body
            const newLocation = await ProfileService.changeLocation(location, id)
            return res.json(newLocation)
        } catch (e) {
            next(e)
        }
    }

    async changeBanner(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await ProfileService.changeBanner(path, id, currentPath)
            return res.json(newPath)
        } catch (e) {
            next(e)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const path = req.file.path
            const {id, currentPath} = req.body
            const newPath = await ProfileService.changAvatar(path, id, currentPath)
            return res.json(newPath)
        } catch (e) {
            next(e)
        }
    }

    async changeAboutMe(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeAboutMe(text, id)
            return res.json(newText)
        } catch (e) {
            next(e)
        }
    }

    async changeHobbies(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeHobbies(text, id)
            return res.json(newText)
        } catch (e) {
            next(e)
        }  }

    async changeSkills(req, res, next) {
        try {
            const {text, id} = req.body
            const newText = await ProfileService.changeSkills(text, id)
            return res.json(newText)
        } catch (e) {
            next(e)
        }
    }

    async addPost(req, res, next) {
        try {
            const {text, id} = req.body
            const newPost = await ProfileService.addPost(text, id)
            return res.json(newPost)
        } catch (e) {
            next(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const {id, userId} = req.params
            const newPosts = await ProfileService.deletePost(id, userId)
            return res.json(newPosts)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProfileController()