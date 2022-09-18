// Axios
import {$api} from "../http"
import {AxiosResponse} from "axios"
// Models
import {AuthResponse} from "../models/response/AuthResponse"

export class UserService {
    static async changeName(name: string, id: number): Promise<AxiosResponse> {
        let response: any

        await $api.put<AuthResponse>(`user/change-name`, {name, id})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (/User with this/.test(response)) return response

        return response
    }

    static async changeLocation(location: string, id: number): Promise<string> {
        const response: AxiosResponse = await $api.put<AuthResponse>(`user/change-location`, {location, id})
        return response.data
    }

    static async changeBanner(data: FormData): Promise<string> {
        const response: AxiosResponse = await $api.put<AuthResponse>(`user/change-banner`, data)
        return response.data
    }

    static async changeAvatar(data: FormData): Promise<string> {
        const response: AxiosResponse = await $api.put<AuthResponse>(`user/change-avatar`, data)
        return response.data
    }
}