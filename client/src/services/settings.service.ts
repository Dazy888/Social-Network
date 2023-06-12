import { $api } from "@/http"

export class SettingsService {
    static setPassword(currentPass: string, newPass: string, id: string) {
        return $api.put('settings/password', { currentPass, newPass, id })
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }

    static activateMail(email: string, id: string) {
        return $api.post('settings/mail', { email, id })
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }

    static async cancelActivation(id: string) {
        return $api.get(`settings/cancel-activation/${id}`)
    }

    static setName(name: string, id: string) {
        return $api.put('settings/name', { text: name, id })
    }

    static setLocation(location: string, id: string) {
        return $api.put('settings/location', { text: location, id })
    }

    static setAvatar(data: FormData) {
        return $api.post('settings/avatar', data)
    }

    static setBanner(data: FormData) {
        return $api.post('settings/banner', data)
    }
}
