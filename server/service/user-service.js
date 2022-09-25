import {UserModel} from "../models/user-model.js"
import {ApiError} from "../exceptions/api-error.js"
import * as fs from "fs";

class UserService {
    async changeName(name, id) {
        const user = await UserModel.findOne({id})

        user.name = name
        user.save()

        return user.name
    }

    async changeLocation(location, id) {
        const user = await UserModel.findOne({id})

        user.location = location
        user.save()

        return user.location
    }

    async changeBanner(path, id, currentPath) {
        const user = await UserModel.findOne({id})
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        user.banner = `http://localhost:5000/${path}`
        user.save()

        return user.banner
    }

    async changAvatar(path, id, currentPath) {
        const user = await UserModel.findOne({id})
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

        user.avatar = `http://localhost:5000/${path}`
        user.save()

        return user.avatar
    }

    async changeAboutMe(text, id) {
        const user = await UserModel.findOne({id})
        user.aboutMe = text
        user.save()

        return user.aboutMe
    }

    async changeHobbies(text, id) {
        const user = await UserModel.findOne({id})
        user.hobbies = text
        user.save()

        return user.hobbies
    }

    async changeSkills(text, id) {
        const user = await UserModel.findOne({id})
        user.skills = text
        user.save()

        return user.skills
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new UserService()