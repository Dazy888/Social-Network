import { $api } from "@/http"

export class SettingsService {
    static changePassword(currentPass: string, newPass: string, id: string) {
        return $api.put('settings/change-pass', { currentPass, newPass, id })
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }

    static activateMail(email: string, id: string) {
        return $api.post('settings/activate-email', { email, id })
            .then(() => email)
            .catch(err => { throw err.response.data.message })
    }

    static async cancelActivation(id: string) {
        return $api.delete(`settings/cancel-activation/${id}`)
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }
}
