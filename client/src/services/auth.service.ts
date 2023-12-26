import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IAuthForm, RefreshResponse, SignInResponse, SignUpResponse } from "@/models/auth.models"
import { getCookie } from "@/layouts/AuthLayout"

export class AuthService {
    static async signUp(data: IAuthForm) {
        return $api.post('auth/sign-up', data)
            .then((res: AxiosResponse<SignUpResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async signIn(data: IAuthForm) {
        return $api.post('auth/sign-in', data)
            .then((res: AxiosResponse<SignInResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async signOut() {
        await $api.delete(`auth/logout/${getCookie('refreshToken')}`)
    }

    static async refresh() {
        return $api.get(`auth/refresh/${getCookie('refreshToken')}`)
            .then((res: AxiosResponse<RefreshResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async recoverPass() {
        return $api.post(`auth/recover-pass`)
            .then((res: AxiosResponse<RefreshResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
