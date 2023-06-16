import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IPost } from "@/models/profile"

export class ProfileService {
    static setProfileIntro(text: string, field: 'aboutMe' | 'skills' | 'hobbies', id: string) {
        return $api.put('profile/intro', { text, field, id })
            .then(() => text)
            .catch(err => { throw err.response.data.message })
    }

    static addPost(text: string, id: string) {
        return $api.post('profile/post', { text, id })
        .then((res: AxiosResponse<IPost>) => res.data)
        .catch(err => { throw err.response.data.message })
    }

    static deletePost(postId: string, id: string) {
        return $api.delete(`profile/post/${postId}/${id}`)
        .then((res) => res.data)
        .catch(err => { throw err.response.data.message })
    }

    static getAvatar(id: string) {
        return $api.get(`profile/avatar/${id}`)
        .then((res: AxiosResponse<string>) => res.data)
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
