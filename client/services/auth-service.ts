import { $api, API_URL } from "../http"
import { AxiosResponse } from "axios"
import { AuthResponse, RefreshResponse } from "../models/auth-responses"

export class AuthService {
    static registration(userLogin: string, password: string, /*token: string*/): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/registration', {userLogin, password, /*token*/})
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static login(userLogin: string, password: string, /*token: string*/): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/login', {userLogin, password, /*token*/})
            .then(res => res)
            .catch((err) => {
                throw err.response.data.message
            })
    }
    static async logout(): Promise<void> {
        await $api.get('auth/logout')
    }
    static refresh() {
        return $api.get(`${API_URL}auth/refresh`, { withCredentials: true })
            .then(res => res)
            .catch((err) => {
                throw err.response
            })
    }
}