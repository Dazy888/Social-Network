import express from "express"
import UserController from "../controllers/user-controller.js"
import {body} from "express-validator"
import {AuthMiddleware} from "../middlewares/auth-middleware.js"

const router = express.Router()

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 8, max: 10}), UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', AuthMiddleware, UserController.getUsers)

export default router