import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { getCookie } from "@/layouts/AuthPage-Layout"

export class ProfileService {
    static setAboutMe(text: string, id: string) {
        return $api.put(`profile/about-me/${getCookie('accessToken')}`, { text, id })
            .then((res) => res.data)
            .catch(err => {
                throw err.response.data.message
            })
    }

    static setSkills(text: string, id: string) {
        return $api.put(`profile/skills/${getCookie('accessToken')}`, { text, id })
        .then((res) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static setHobbies(text: string, id: string) {
        return $api.put(`profile/hobbies/${getCookie('accessToken')}`, { text, id })
        .then((res) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static addPost(text: string, id: string) {
        return $api.post(`profile/post/${getCookie('accessToken')}`, { text, id })
        .then((res) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static deletePost(postId: string, id: string) {
        return $api.delete(`profile/post/${postId}/${id}/${getCookie('accessToken')}`)
        .then((res) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static getAvatar(id: string) {
        return $api.get(`profile/avatar/${id}/${getCookie('accessToken')}`)
        .then((res: AxiosResponse<string>) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static follow(authorizedUserId: string, openedUserId: string) {
        return $api.put(`profile/follow/${getCookie('accessToken')}`, { authorizedUserId, openedUserId })
        .then((res) => res.data)
        .catch(err => {
            throw err.response.data.message
        })
    }

    static unfollow(authorizedUserId: string, openedUserId: string) {
        return $api.put(`profile/unfollow/${getCookie('accessToken')}`, { authorizedUserId, openedUserId })
        .then((res) => res.data)
        .catch(err => {
        throw err.response.data.message
        })
    }
}
