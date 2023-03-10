import { $api } from "@/http"
import { AxiosResponse } from "axios"
import { IPost } from "@/interfaces/profile.interfaces"

export class ProfileService {
    static setAboutMe(text: string, userId: string) {
        return $api.put('profile/about-me', { text, userId })
    }

    static setSkills(text: string, userId: string) {
        return $api.put('profile/skills', { text, userId })
    }

    static setHobbies(text: string, userId: string) {
        return $api.put('profile/hobbies', { text, userId })
    }

    static addPost(text: string, userId: string): Promise<AxiosResponse<IPost>> {
        return $api.post('profile/post', { text, userId })
    }

    static deletePost(postId: string, userId: string): Promise<AxiosResponse<IPost[]>> {
        return $api.delete(`profile/post/${postId}/${userId}`)
    }

    static getAvatar(userId: string) {
        return $api.get(`profile/avatar/${userId}`)
    }

    static follow(authorizedUserId: string, openedUserId: string) {
        return $api.put(`profile/follow`, { authorizedUserId, openedUserId })
    }

    static unfollow(authorizedUserId: string, openedUserId: string) {
        return $api.put(`profile/unfollow`, { authorizedUserId, openedUserId })
    }
}
