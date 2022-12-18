import { $api } from "../http"
import { AxiosResponse } from "axios"
import { SettingsResponse } from "../models/settings-response"

export class SettingsService {
    static async changePass(pass: string, newPass: string, id: number): Promise<AxiosResponse> {
        return $api.put<AxiosResponse>('settings/password', { pass, newPass, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static async activate(email: string, id: number): Promise<AxiosResponse> {
        return $api.post<SettingsResponse>('settings/mail', { email, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static async cancelActivation(id: number): Promise<AxiosResponse> {
        return $api.get<AxiosResponse>(`settings/cancel-activation/${id}`)
    }
}