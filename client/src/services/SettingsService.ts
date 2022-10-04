import {$api} from "../http"
import {AxiosResponse} from "axios"

export class SettingsService {
    static async changePass(pass: string, newPass: string, id: number): Promise<any> {
        let response: any
        await $api.put<AxiosResponse>('settings/change-pass', {pass, newPass, id})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (typeof response === "string") return response
        return response
    }

    static async activate(email: string, id: number): Promise<AxiosResponse> {
        const response = await $api.post<AxiosResponse>('settings/send-link', {email, id})
        return response
    }

    static async cancelActivation(id: number): Promise<AxiosResponse> {
        const response = await $api.put<AxiosResponse>('settings/cancel-activation', {id})
        return response
    }
}