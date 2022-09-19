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

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new UserService()