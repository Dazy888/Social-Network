import {UserModel} from "../models/user-model.js"

class UsersService {
    getAll() {
        const users = UserModel.find()
        return users
    }
}

export default new UsersService()