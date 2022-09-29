import express from "express"
import UserController from "../controllers/user-controller.js"
import {uploadAvatar, uploadBanner} from "../middlewares/upload-middleware.js"

export const userRouter = express.Router()

// Header
userRouter.put('/change-name', UserController.changeName)
userRouter.put('/change-location', UserController.changeLocation)
// Information
userRouter.put('/change-aboutMe', UserController.changeAboutMe)
userRouter.put('/change-hobbies', UserController.changeHobbies)
userRouter.put('/change-skills', UserController.changeSkills)
// Photographs
userRouter.put('/change-banner', uploadBanner.single('file'), UserController.changeBanner)
userRouter.put('/change-avatar', uploadAvatar.single('file'), UserController.changeAvatar)
// Posts
userRouter.put('/add-post', UserController.addPost)
userRouter.delete('/delete-post/:id/:userId', UserController.deletePost)
// Settings
userRouter.get('/activate/:link', UserController.activate)