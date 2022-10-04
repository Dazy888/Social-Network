// Libraries
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import {v4 as uuidv4} from "uuid"
// Services
import SettingsService from "../service/settings-service.js"
import MailService from "../service/mail-service.js"
// Models
import {UserModel} from "../models/user-model.js"
import {ServerErrors} from "../exceptions/api-error.js"

dotenv.config()

class SettingsController {
    async changePass(req, res, next) {
        try {
            const {pass, newPass, id} = req.body
            const user = await UserModel.findOne({id})

            const isPassEquals = await bcrypt.compare(pass, user.password)
            if (!isPassEquals) ServerErrors.BadRequest('Wrong password')

            await SettingsService.changePass(bcrypt.hash(newPass, 3), id)
            res.json('Ok')
        } catch (e) {
            next(e)
        }
    }

    async sendMail(req, res, next) {
        try {
            const {email, id} = req.body
            const link = uuidv4()
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/settings/activate/${link}`)
            await SettingsService.sendMail(email, link, id)
            res.json({isActivated: true, email})
        } catch (e) {
            next(e)
        }
    }

    async cancelActivation(req, res, next) {
        try {
            const {id} = req.body
            await SettingsService.cancelActivation(id)
            res.json('Ok')
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            await SettingsService.activate(req.params.link)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
}

export default new SettingsController()