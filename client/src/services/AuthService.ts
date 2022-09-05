// Axios
import {$api, API_URL} from "../http"
import {AxiosResponse} from "axios"
// Models
import {AuthResponse} from "../models/response/AuthResponse"

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('logout')
    }

    static async refresh(): Promise<AxiosResponse> {
        return $api.get<AuthResponse>(`${API_URL}refresh`, {withCredentials: true})
    }
}