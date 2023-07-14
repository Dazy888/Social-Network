import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IPost, ProfileIntroFields, SetProfileImageParams, SetProfileInfoProps } from "@/models/profile.models"

export class ProfileService {
    static setProfileIntro(text: string, field: ProfileIntroFields, id: string) {
        return $api.put('profile/updateIntro', { text, field, id })
            .then(() => ({ text, field }))
            .catch(err => { throw err.response.data.message })
    }

    static addPost(text: string, id: string) {
        return $api.post('profile/post', { text, id })
            .then((res: AxiosResponse<IPost>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static deletePost(postId: string) {
        return $api.delete(`profile/post/${postId}`)
            .then(() => postId)
            .catch(err => { throw err.response.data.message })
    }

    static getAvatar(id: string) {
        return $api.get(`profile/avatar/${id}`)
            .then((res: AxiosResponse<string>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async updateProfileInfo(data: SetProfileInfoProps) {
        return $api.put('profile/updateProfileInfo', data)
            .then(() => ({ name: data.name, location: data.location }))
            .catch(err => { throw err.response.data.message })
    }

    static async uploadProfileImage(data: FormData) {
        return $api.put('profile/updateImage', data)
            .then((res: AxiosResponse<SetProfileImageParams>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static follow(authorizedUserId: string, openedUserId: string) {
        return $api.put('profile/follow', { authorizedUserId, openedUserId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static unfollow(authorizedUserId: string) {
        return $api.delete(`profile/unfollow/${authorizedUserId}`)
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
