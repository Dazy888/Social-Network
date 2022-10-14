import {$api} from "../http"
import {AxiosResponse} from "axios"

export class ProfileService {
    static async changeName(name: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/change-name`, {name, id})
            .then(res => {return res})
            .catch((e) => {return e.response})
    }

    static async changeLocation(location: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/change-location`, {location, id})
    }

    static async changeBanner(data: FormData): Promise<AxiosResponse> {
        return $api.put(`profile/change-banner`, data)
    }

    static async changeAvatar(data: FormData): Promise<AxiosResponse> {
        return $api.put(`profile/change-avatar`, data)
    }

    static async changeAboutMe(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/change-aboutMe`, {text, id})
    }

    static async changeHobbies(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/change-hobbies`, {text, id})
    }

    static async changeSkills(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/change-skills`, {text, id})
    }

    static async addPost(text: string, id: number): Promise<AxiosResponse> {
        return $api.put(`profile/add-post`, {text, id})
    }

    static async deletePost(id: number, userId: number): Promise<AxiosResponse> {
        return $api.delete(`profile/delete-post/${id}/${userId}`)
    }
}