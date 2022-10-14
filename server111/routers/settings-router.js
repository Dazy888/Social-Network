import express from "express"
import SettingsController from "../controllers/settings-controller.js"

export const settingsRouter = express.Router()

settingsRouter.get('/activate/:link', SettingsController.activate)
settingsRouter.post('/send-link', SettingsController.sendMail)
settingsRouter.put('/cancel-activation', SettingsController.cancelActivation)
settingsRouter.put('/change-pass', SettingsController.changePass)