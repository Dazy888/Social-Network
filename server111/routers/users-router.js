import express from "express"
import UsersController from "../controllers/users-controller.js";

export const usersRouter = express.Router()

usersRouter.get('/get-all', UsersController.getAll)