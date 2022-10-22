import {$api} from "../http"
import {AxiosResponse} from "axios"

export class SettingsService {
    static async changePass(pass: string, newPass: string, id: number): Promise<AxiosResponse> {
        return $api.put<AxiosResponse>('settings/password', {pass, newPass, id})
            .then(res => {return res})
            .catch((e) => {return e.response})
    }

    static async activate(email: string, id: number): Promise<AxiosResponse> {
        return $api.post<AxiosResponse>('settings/mail', {email, id})
    }

    static async cancelActivation(id: number): Promise<AxiosResponse> {
        return $api.get<AxiosResponse>(`settings/cancel-activation/${id}`)
    }
}