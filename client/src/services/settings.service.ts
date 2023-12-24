import { $api } from "@/http"

export class SettingsService {
    static async changePass(data: any) {
        return $api.put('settings/change-password', data)
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }

    static async activateMail(data: any) {
        return $api.post('settings/activateEmail', data)
            .then(() => data.email)
            .catch(err => { throw err.response.data.message })
    }

    static async cancelActivation(userId: string) {
        return $api.delete(`settings/cancel-email-activation/${userId}`)
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }
}
