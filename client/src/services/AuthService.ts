import {$api, API_URL} from "../http"
import {AxiosResponse} from "axios"
import {AuthResponse} from "../models/response/AuthResponse"

export class AuthService {
    static registration(userLogin: string, password: string, token: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>('auth/registration', {userLogin, password, token})
            .then(res => {return res})
            .catch((err) => {return err.response})
    }

    static login(userLogin: string, password: string, token: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>('auth/login', {userLogin, password, token})
            .then(res => {return res})
            .catch((err) => {return err.response})
     }

    static async logout(): Promise<void> {
        await $api.get('auth/logout')
    }

    static refresh(): Promise<AxiosResponse> {
        return $api.get<AuthResponse>(`${API_URL}auth/refresh`, {withCredentials: true})
    }
}