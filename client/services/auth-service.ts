import { $api, API_URL } from "../http"
import { AxiosResponse } from "axios"
import { AuthResponses, RefreshResponse } from "../models/auth-responses"

export class AuthService {
    static registration(userLogin: string, password: string, /*token: string*/): Promise<AxiosResponse> {
        return $api.post<AuthResponses>('auth/registration', {userLogin, password, /*token*/})
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static login(userLogin: string, password: string, /*token: string*/): Promise<AxiosResponse> {
        return $api.post<AuthResponses>('auth/login', {userLogin, password, /*token*/})
            .then(res => res)
            .catch((err) => {
                throw err.response.data.message
            })
    }
    static async logout(): Promise<void> {
        await $api.get('auth/logout')
    }
    static refresh(): Promise<AxiosResponse> {
        return $api.get<RefreshResponse>(`${API_URL}auth/refresh`, { withCredentials: true })
            .then(res => res)
            .catch((err) => {
                throw err.response
            })
    }
}