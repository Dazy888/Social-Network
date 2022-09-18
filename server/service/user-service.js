import {UserModel} from "../models/user-model.js"
import {ApiError} from "../exceptions/api-error.js"

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

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new UserService()