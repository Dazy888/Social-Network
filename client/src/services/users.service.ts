import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { PublicUserData, UsersResponse } from "@/models/users.models"

export class UsersService {
    static async getUsers(skip: number, id: string) {
        return $api.get(`users/${skip}/${id}`)
            .then((res: AxiosResponse<UsersResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async getUser(id: string) {
        return $api.get(`users/${id}`)
            .then((res: AxiosResponse<PublicUserData>) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
