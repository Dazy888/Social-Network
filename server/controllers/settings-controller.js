import SettingsService from "../service/settings-service.js";
import {UserModel} from "../models/user-model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import MailService from "../service/mail-service.js";
import {v4 as uuidv4} from "uuid";

dotenv.config()

class SettingsController {
    async changePass(req, res, next) {
        try {
            const {pass, newPass, id} = req.body
            const user = await UserModel.findOne({id})
            const isPassEquals = await bcrypt.compare(pass, user.password)

            if (!isPassEquals) {
                res.status(400)
                res.json('Wrong password')
                return
            }

            await SettingsService.changePass(newPass, id)
            res.status(200)
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
            res.status(200)
            res.json({isActivated: true, email})
        } catch (e) {
            next(e)
        }
    }

    async cancelActivation(req, res, next) {
        try {
            const {id} = req.body
            await SettingsService.cancelActivation(id)
            res.status(200)
            res.json({status: 'Success'})
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            await SettingsService.activate(req.params.link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
}

export default new SettingsController()