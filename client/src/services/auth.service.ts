import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { RefreshResponse, SignInResponse, SignUpResponse } from "@/models/auth.models"
import { getCookie } from "@/layouts/AuthLayout"

export class AuthService {
    static registration(userName: string, pass: string) {
        return $api.post('auth/registration', { userName, pass })
            .then((res: AxiosResponse<SignUpResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static login(userName: string, pass: string) {
        return $api.post('auth/login', { userName, pass, })
            .then((res: AxiosResponse<SignInResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async logout() {
        await $api.get(`auth/logout/${getCookie('refreshToken')}`)
    }

    static refresh() {
        return $api.get(`auth/refresh/${getCookie('refreshToken')}`)
            .then((res: AxiosResponse<RefreshResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
