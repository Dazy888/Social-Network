// Libraries
import express from "express"
// Controllers
import UserController from "../controllers/user-controller.js"
// Middlewares
import {upload} from "../middlewares/upload-middleware.js"

export const userRouter = express.Router()

userRouter.put('/change-name', UserController.changeName)
userRouter.put('/change-location', UserController.changeLocation)
userRouter.put('/change-banner', upload.single('file'), UserController.changeBanner)
userRouter.put('/change-avatar', upload.single('file'), UserController.changeAvatar)
userRouter.get('/activate/:link', UserController.activate)