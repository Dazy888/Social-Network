import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IPost, SetProfileImageParams, TextProps, UpdateProfileDTO } from "@/models/profile.models"

export class ProfileService {
    static async updateProfile(data: UpdateProfileDTO, userId: string) {
        return $api.put(`profile/update/${userId}`, data)
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async createPost(data: TextProps) {
        return $api.post('profile/post/create', data)
            .then((res: AxiosResponse<IPost>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async deletePost(id: string) {
        return $api.delete(`profile/post/delete/${id}`)
            .then(() => id)
            .catch(err => { throw err.response.data.message })
    }

    static async getAvatar(id: string) {
        return $api.get(`profile/avatar/${id}`)
            .then((res: AxiosResponse<string>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async uploadProfileImage(data: FormData) {
        return $api.patch('profile/update-image', data)
            .then((res: AxiosResponse<SetProfileImageParams>) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
