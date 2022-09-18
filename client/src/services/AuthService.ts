// Axios
import {$api, API_URL} from "../http"
import {AxiosResponse} from "axios"
// Models
import {AuthResponse} from "../models/response/AuthResponse"

export class AuthService {
    static async registration(userLogin: string, password: string, token: string): Promise<any> {
        let response: any
        await $api.post<AuthResponse>('auth/registration', {userLogin, password, token})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (/User with this/.test(response)) {
            return {field: 'login', message: response}
        } else if (/Please/.test(response)) {
            return response
        }

        return response
    }

    static async login(userLogin: string, password: string, token: string): Promise<any> {
        let response: any
        await $api.post<AuthResponse>('auth/login', {userLogin, password, token})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (response === 'Wrong password') {
            return {field: 'password', message: response}
        } else if (/User with this/.test(response)) {
            return {field: 'login', message: response}
        }

        return response
    }

    static async logout(): Promise<void> {
        return $api.post('auth/logout')
    }

    static async refresh(): Promise<AxiosResponse> {
        return $api.get<AuthResponse>(`${API_URL}auth/refresh`, {withCredentials: true})
    }
}