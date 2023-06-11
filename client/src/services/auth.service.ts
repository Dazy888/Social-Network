import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { RefreshResponse, SignInResponse, SignUpResponse } from "@/models/auth"
import { getCookie } from "@/layouts/AuthPage-Layout"

export class AuthService {
    static registration(login: string, pass: string) {
        return $api.post('auth/registration', { login, pass })
            .then((res: AxiosResponse<SignUpResponse>) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static login(login: string, pass: string) {
        return $api.post('auth/login', { login, pass, })
            .then((res: AxiosResponse<SignInResponse>) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static async logout() {
        await $api.get('auth/logout')
    }

    static refresh() {
        return $api.get(`auth/refresh/${getCookie('refreshToken')}`)
            .then((res: AxiosResponse<RefreshResponse>) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }
}
