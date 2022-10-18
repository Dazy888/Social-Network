import {$api} from "../http"
import {AxiosResponse} from "axios"

export class ProfileService {
    static async changeName(name: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/name`, {name, id})
            .then(res => {return res})
            .catch((e) => {return e.response})
    }

    static async changeLocation(location: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/location`, {location, id})
    }

    static async changeBanner(data: FormData): Promise<AxiosResponse> {
        return $api.put(`profile/banner`, data)
    }

    static async changeAvatar(data: FormData): Promise<AxiosResponse> {
        return $api.put(`profile/avatar`, data)
    }

    static async changeAboutMe(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/about-me`, {text, id})
    }

    static async changeHobbies(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/hobbies`, {text, id})
    }

    static async changeSkills(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/skills`, {text, id})
    }

    static async addPost(text: string, id: number): Promise<AxiosResponse> {
        return $api.post(`profile/post`, {text, id})
    }

    static async deletePost(id: number, userId: number): Promise<AxiosResponse> {
        return $api.delete(`profile/post/${id}/${userId}`)
    }
}