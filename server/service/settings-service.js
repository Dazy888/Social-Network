import {UserModel} from "../models/user-model.js"
import {ServerErrors} from "../exceptions/api-error.js";

class SettingsService {
    async changePass(pass, id) {
        const user = await UserModel.findOne({id})
        user.password = pass
        user.save()
    }

    async sendMail(email, activationLink, id) {
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
        if (!user) ServerErrors.BadRequest('Invalid activation link')
        user.isActivated = true
        user.save()
    }
}

export default new SettingsService()