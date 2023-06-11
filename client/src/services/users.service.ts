import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { PublicUserData, UsersResponse } from "@/models/users"

export class UsersService {
    static getUsers(skip: number, id: string) {
        return $api.get(`users/${skip}/${id}`)
            .then((res: AxiosResponse<UsersResponse>) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static getUser(userId: string) {
        return $api.get(`users/${userId}`)
            .then((res: AxiosResponse<PublicUserData>) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }
}
