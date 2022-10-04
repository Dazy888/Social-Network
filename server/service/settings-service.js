import {UserModel} from "../models/user-model.js";
import {ApiError} from "../exceptions/api-error.js";
import bcrypt from "bcrypt";

class SettingsService {
    async changePass(pass, id) {
        const user = await UserModel.findOne({id})
        const password = await bcrypt.hash(pass, 3)

        user.password = password
        user.save()
    }

    async sendMail(email, activationLink, id) {
        console.log(activationLink)
        const user = await UserModel.findOne({id})
        user.email = email
        user.activationLink = activationLink
        user.save()
    }

    async cancelActivation(id) {
        const user = await UserModel.findOne({id})
        user.email = ''
        user.save()
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) throw ApiError.BadRequest('Invalid activation link')

        user.isActivated = true
        user.save()
    }
}

export default new SettingsService()