import {$api} from "../http"
import {AxiosResponse} from "axios"

export class SettingsService {
    static async changePass(pass: string, newPass: string, id: number): Promise<AxiosResponse> {
        return  $api.put<AxiosResponse>('settings/change-pass', {pass, newPass, id})
            .then(res => {return res})
            .catch((e) => {return e.response})
    }

    static async activate(email: string, id: number): Promise<AxiosResponse> {
        return $api.post<AxiosResponse>('settings/send-link', {email, id})
    }

    static async cancelActivation(id: number): Promise<AxiosResponse> {
        return $api.put<AxiosResponse>('settings/cancel-activation', {id})
    }
}