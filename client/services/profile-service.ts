import { $api } from "../http"
import { AxiosResponse } from "axios"

export class ProfileService {
    static changeName(name: string, id: string): Promise<AxiosResponse> {
        return $api.put(`profile/name`, { text: name, id })
    }
    static changeLocation(location: string, id: string): Promise<AxiosResponse> {
        return $api.put(`profile/location`, { text: location, id })
    }
    static async changeBanner(data: FormData): Promise<AxiosResponse> {
        return $api.post(`profile/banner`, data)
    }
    static async changeAvatar(data: FormData): Promise<AxiosResponse> {
        return $api.post(`profile/avatar`, data)
    }
    static async changeAboutMe(text: string, id: string): Promise<AxiosResponse> {
        return $api.put(`profile/about-me`, { text, id })
    }
    static async changeHobbies(text: string, id: string): Promise<AxiosResponse> {
        return $api.put(`profile/hobbies`, { text, id })
    }
    static async changeSkills(text: string, id: string): Promise<AxiosResponse> {
        return $api.put(`profile/skills`, { text, id })
    }
    static async addPost(text: string, id: string): Promise<AxiosResponse> {
        return $api.post(`profile/post`, { text, id })
    }
    static async deletePost(id: string, userId: string): Promise<AxiosResponse> {
        return $api.delete(`profile/post/${id}/${userId}`)
    }
}