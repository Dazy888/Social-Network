import { $api } from "../http"
import { UsersResponses } from "../models/users-responses"
import { UserData } from "../pages/main/users/types/users-types"

export const UsersService = {
    async getUsers(skip: number, id: string) {
        return $api.get<UsersResponses>(`users/${skip}/${id}`)
    },

    async getUser(id: string) {
        return $api.get<UserData>(`users/${id}`)
    }
}