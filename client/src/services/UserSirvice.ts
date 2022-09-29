// Axios
import {$api} from "../http"
import {AxiosResponse} from "axios"
import {PostType} from "../pages/login/types/login-types";

export class UserService {
    static async changeName(name: string, id: number): Promise<AxiosResponse> {
        let response: any

        await $api.put(`user/change-name`, {name, id})
            .then(res => response = res)
            .catch((e) => response = e.response.data)

        if (/User with this/.test(response)) return response

        return response
    }

    static async changeLocation(location: string, id: number): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-location`, {location, id})
        return response.data
    }

    static async changeBanner(data: FormData): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-banner`, data)
        return response.data
    }

    static async changeAvatar(data: FormData): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-avatar`, data)
        return response.data
    }

    static async changeAboutMe(text: string, id: number): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-aboutMe`, {text, id})
        return response.data
    }

    static async changeHobbies(text: string, id: number): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-hobbies`, {text, id})
        return response.data
    }

    static async changeSkills(text: string, id: number): Promise<string> {
        const response: AxiosResponse = await $api.put(`user/change-skills`, {text, id})
        return response.data
    }

    static async addPost(text: string, id: number): Promise<PostType> {
        const response: AxiosResponse = await $api.put(`user/add-post`, {text, id})
        return response.data
    }

    static async deletePost(id: number, userId: number): Promise<Array<PostType>> {
        const response: AxiosResponse = await $api.delete(`user/delete-post/${id}/${userId}`)
        return response.data
    }
}