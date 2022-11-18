import { IUser } from "../IUser"
import { PostType } from "../../pages/profile/types/profile-types";

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface RefreshResponse {
    user: {
        password: string
        userLogin: string
        isActivated: boolean
        activationLink: string
        email: string
        name: string
        location: string
        banner: string
        avatar: string
        aboutMe: string
        skills: string
        hobbies: string
        id: number
    },
    accessToken: string
    refreshToken: string
    posts: PostType[]
}