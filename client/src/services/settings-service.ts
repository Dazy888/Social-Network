import { $api } from "../http"
import { AxiosResponse } from "axios"
export class SettingsService {
    static async changePass(pass: string, newPass: string, id: string) {
        return $api.put('settings/password', { pass, newPass, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static async activate(email: string, id: string): Promise<AxiosResponse<string>> {
        return $api.post('settings/mail', { email, id })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }
    static async cancelActivation(id: string) {
        return $api.get(`settings/cancel-activation/${id}`)
    }
}