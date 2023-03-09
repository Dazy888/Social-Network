import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IUserData, UsersResponse } from "@/interfaces/users.interfaces"

export class UsersService {
    static getUsers(skip: number, userId: string): Promise<AxiosResponse<UsersResponse>> {
        return $api.get(`users/${skip}/${userId}`)
    }

    static getUser(userId: string): Promise<AxiosResponse<IUserData>> {
        return $api.get(`users/${userId}`)
    }
}
