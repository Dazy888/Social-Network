import { $api } from "../http"
import { AxiosResponse } from "axios"
import { SettingsResponses } from "../models/settings-responses"

export class SettingsService {
    static async changePass(pass: string, newPass: string, id: string): Promise<AxiosResponse> {
        return $api.put('settings/password', { pass, newPass, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static async activate(email: string, id: string): Promise<AxiosResponse> {
        return $api.post<SettingsResponses>('settings/mail', { email, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static async cancelActivation(id: string): Promise<AxiosResponse> {
        return $api.get(`settings/cancel-activation/${id}`)
    }
}