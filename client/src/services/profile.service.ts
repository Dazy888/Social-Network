import { $api } from "@/http"
import { AxiosResponse } from "axios"
import {IPost, ProfileIntroFields, SetProfileImageProps, SetProfileInfoProps} from "@/models/profile.models"

export class ProfileService {
    static setProfileIntro(text: string, field: ProfileIntroFields, id: string) {
        return $api.put('profile/intro', { text, field, id })
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

    static async setProfileInfo(data: SetProfileInfoProps) {
        return $api.put('profile/profile-info', data)
            .then(() => ({ name: data.name, location: data.location }))
            .catch(err => { throw err.response.data.message })
    }

    static async uploadProfileImage(data: FormData) {
        return $api.put('profile/profile-image', data)
            .then((res: AxiosResponse<SetProfileImageProps>) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static follow(authorizedUserId: string, openedUserId: string) {
        return $api.put('profile/follow', { authorizedUserId, openedUserId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static unfollow(authorizedUserId: string, openedUserId: string) {
        return $api.put('profile/unfollow', { authorizedUserId, openedUserId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
