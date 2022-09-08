// Axios
import {$api, API_URL} from "../http"
import {AxiosResponse} from "axios"
// Models
import {AuthResponse} from "../models/response/AuthResponse"

export class AuthService {
    static async registration(login: string, password: string, token: string): Promise<any> {
        let response: any
        await $api.post<AuthResponse>('registration', {login, password, token})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (/User with this/.test(response)) {
            return {field: 'login', message: response}
        } else if (/Please/.test(response)) {
            return response
        }

        return response
    }

    static async login(login: string, password: string, token: string): Promise<any> {
        let response: any
        await $api.post<AuthResponse>('login', {login, password, token})
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
        return $api.post('logout')
    }

    static async refresh(): Promise<AxiosResponse> {
        return $api.get<AuthResponse>(`${API_URL}refresh`, {withCredentials: true})
    }
}