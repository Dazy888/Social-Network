import {$api, API_URL} from "../http"
import {AxiosResponse} from "axios"
import {AuthResponse} from "../models/response/AuthResponse"

export class AuthService {
    static async registration(userLogin: string, password: string, token: string): Promise<AxiosResponse> {
        const response = await $api.post<AuthResponse>('auth/registration', {userLogin, password, token})
        console.log(response)
        return response
        // return $api.post<AuthResponse>('auth/registration', {userLogin, password, token})
        //     .then((res) => {
        //         console.log(res)
        //         return res
        //     })
            // .catch((err) => {
            //     console.log(err)
            // })
    }

    static async login(userLogin: string, password: string, token: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>('auth/login', {userLogin, password, token})
            .then(res => {return res})
            .catch((e) => {return e.response})
     }

    static async logout(): Promise<void> {
        await $api.get('auth/logout')
    }

    static async refresh(): Promise<AxiosResponse> {
        const response = $api.get<AuthResponse>(`${API_URL}auth/refresh`)
        console.log(response)
        return response
    }
}