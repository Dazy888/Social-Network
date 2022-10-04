import express from "express"
import {uploadAvatar, uploadBanner} from "../middlewares/upload-middleware.js"
import ProfileController from "../controllers/profile-controller.js"

export const profileRouter = express.Router()

// Header
profileRouter.put('/change-name', ProfileController.changeName)
profileRouter.put('/change-location', ProfileController.changeLocation)
// Information
profileRouter.put('/change-aboutMe', ProfileController.changeAboutMe)
profileRouter.put('/change-hobbies', ProfileController.changeHobbies)
profileRouter.put('/change-skills', ProfileController.changeSkills)
// Photographs
profileRouter.put('/change-banner', uploadBanner.single('file'), ProfileController.changeBanner)
profileRouter.put('/change-avatar', uploadAvatar.single('file'), ProfileController.changeAvatar)
// Posts
profileRouter.put('/add-post', ProfileController.addPost)
profileRouter.delete('/delete-post/:id/:userId', ProfileController.deletePost)