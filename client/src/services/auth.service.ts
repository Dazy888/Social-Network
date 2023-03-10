import { $api, API_URL } from "@/http"
import { AxiosResponse } from "axios"
import { AuthResponse, RefreshResponse } from "@/interfaces/auth.interfaces"

export class AuthService {
    static registration(login: string, password: string, /*token: string*/): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/registration', { login, password, /*token*/ })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static login(login: string, password: string, /*token: string*/): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('auth/login', { login, password, /*token*/ })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static async logout() {
        await $api.get('auth/logout')
    }

    static refresh(): Promise<AxiosResponse<RefreshResponse>> {
        return $api.get(`${API_URL}auth/refresh`, { withCredentials: true })
            .then(res => res)
            .catch(err => {
                throw err.response
            })
    }
}
