import {UserModel} from "../models/user-model.js"
import {ApiError} from "../exceptions/api-error.js"

class UserService {
    async changeName(name, currentName) {
        const user = await UserModel.findOne({currentName})

        user.name = name
        user.save()

        return user.name
    }

    async changeLocation(location, currentName) {
        const user = await UserModel.findOne({currentName})

        user.location = location
        user.save()

        return user.location
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new UserService()