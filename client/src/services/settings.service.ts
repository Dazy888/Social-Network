import { $api } from "@/http"
import { AxiosResponse } from "axios"

export class SettingsService {
    static changePassword(currentPass: string, newPass: string, id: string) {
        return $api.put('settings/change-pass', { currentPass, newPass, id })
            .then(res => res)
            .catch(err => { throw err.response.data.message })
    }

    static activateMail(email: string, id: string) {
        return $api.post('settings/activation', { email, id })
            .then(() => email)
            .catch(err => { throw err.response.data.message })
    }

    static async cancelActivation(id: string) {
        return $api.delete(`settings/cancel-activation/${id}`)
        .then(res => res)
        .catch(err => { throw err.response.data.message })
    }

    static setName(name: string, id: string) {
        return $api.put('settings/name', { text: name, id })
        .then(() => name)
        .catch(err => { throw err.response.data.message })
    }

    static setLocation(location: string, id: string) {
        return $api.put('settings/location', { text: location, id })
        .then(() => location)
        .catch(err => { throw err.response.data.message })
    }

    static setAvatar(data: FormData) {
        return $api.post('settings/avatar', data)
        .then((res: AxiosResponse<string>) => res.data)
        .catch(err => { throw err.response.data.message })
    }

    static setBanner(data: FormData) {
        return $api.post('settings/banner', data)
        .then((res: AxiosResponse<string>) => res.data)
        .catch(err => { throw err.response.data.message })
    }
}
