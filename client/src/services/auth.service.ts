import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IAuthForm, IRecoverForm, RefreshResponse, SetNewPassDTO, SignInResponse, SignUpResponse } from "@/models/auth.models"
import { getCookie } from "@/layouts/AuthLayout"
import { CredentialResponse } from "@react-oauth/google"

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

    static async googleSignIn(data: CredentialResponse) {
        return $api.post('auth/google/sign-in', data)
            .then((res: AxiosResponse<SignInResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async signOut() {
        await $api.delete(`auth/sign-out/${getCookie('refreshToken')}`)
    }

    static async refresh() {
        return $api.get(`auth/refresh/${getCookie('refreshToken')}`)
            .then((res: AxiosResponse<RefreshResponse>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async recoverPass(data: IRecoverForm) {
        return $api.post(`auth/recover-pass`, data)
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async setNewPass(data: SetNewPassDTO) {
        return $api.patch(`auth/set-new-pass`, data)
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
