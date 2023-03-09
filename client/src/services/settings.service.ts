import { $api } from "@/http"

export class SettingsService {
    static setPassword(currentPass: string, newPass: string, userId: string) {
        return $api.put('settings/password', { currentPass, newPass, userId })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static activateMail(email: string, userId: string) {
        return $api.post('settings/mail', { email, userId })
            .then(res => res)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static async cancelActivation(userId: string) {
        return $api.get(`settings/cancel-activation/${userId}`)
    }
}
