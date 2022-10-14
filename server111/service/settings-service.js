import {UserModel} from "../models/user-model.js"
import {ServerErrors} from "../exceptions/api-error.js";

class SettingsService {
    async changePass(pass, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {password: pass})
    }

    async sendMail(email, activationLink, id) {
        await UserModel.findByIdAndUpdate({_id: id}, {email: email}, {activationLink: activationLink})
    }

    async cancelActivation(id) {
        await UserModel.findByIdAndUpdate({_id: id}, {email: ''})
    }

    async activate(activationLink) {
        const user = await UserModel.findOneAndUpdate({activationLink}, {isActivated: true})
        if (!user) ServerErrors.BadRequest('Invalid activation link')
    }
}

export default new SettingsService()