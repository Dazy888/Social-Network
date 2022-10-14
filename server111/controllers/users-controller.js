import dotenv from "dotenv"
import UsersService from "../service/users-service.js"

dotenv.config()

class UsersController {
    async getAll(req, res, next) {
        try {
            const users = await UsersService.getAll()
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UsersController()