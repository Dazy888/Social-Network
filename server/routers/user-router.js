import express from "express"
import UserController from "../controllers/user-controller.js"
import {uploadAvatar, uploadBanner} from "../middlewares/upload-middleware.js"

export const userRouter = express.Router()

userRouter.put('/change-name', UserController.changeName)
userRouter.put('/change-location', UserController.changeLocation)
userRouter.put('/change-aboutMe', UserController.changeAboutMe)
userRouter.put('/change-hobbies', UserController.changeHobbies)
userRouter.put('/change-skills', UserController.changeSkills)
userRouter.put('/change-banner', uploadBanner.single('file'), UserController.changeBanner)
userRouter.put('/change-avatar', uploadAvatar.single('file'), UserController.changeAvatar)
userRouter.get('/activate/:link', UserController.activate)