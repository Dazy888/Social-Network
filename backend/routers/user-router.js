// Libraries
import express from "express"
// Controllers
import UserController from "../controllers/user-controller.js"
// Middlewares
import {AuthMiddleware} from "../middlewares/auth-middleware.js"
import upload from "../middlewares/upload-middleware.js"

export const userRouter = express.Router()

userRouter.put('/change-name', UserController.changeName)
userRouter.put('/change-location', UserController.changeLocation)
userRouter.get('/activate/:link', UserController.activate)


// userRouter.post('/upload', upload.single('banner'), UserController.changeHeaderPhoto)
// userRouter.get('/users', AuthMiddleware, UserController.getUsers)