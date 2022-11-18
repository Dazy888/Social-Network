import { $api } from "../http"
import { Users } from "../models/response/users-response"

export const UsersService = {
    async getUsers() {
        return $api.get<Users[]>('users')
    }
}