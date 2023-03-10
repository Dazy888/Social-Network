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

    static setName(name: string, userId: string) {
        return $api.put('settings/name', { text: name, userId })
    }

    static setLocation(location: string, userId: string) {
        return $api.put('settings/location', { text: location, userId })
    }

    static setAvatar(data: FormData) {
        return $api.post('settings/avatar', data)
    }

    static setBanner(data: FormData) {
        return $api.post('settings/banner', data)
    }
}
