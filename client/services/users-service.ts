import { $api } from "../http"
import { UsersResponse } from "../models/users-response"
import { UserData } from "../pages/main/users/types/users-types"

export const UsersService = {
    async getUsers(skip: number, id: string) {
        return $api.get<UsersResponse>(`users/${skip}/${id}`)
    },
    async getUser(id: string) {
        return $api.get<UserData>(`users/${id}`)
    }
}