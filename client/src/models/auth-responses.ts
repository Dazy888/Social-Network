import { PostI } from "@/interfaces/profile-interfaces"

export interface AuthUserI {
    email: string
    isActivated: boolean
}

export interface TokensI {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse {
    tokens: TokensI
    user: AuthUserI
}

export interface RefreshResponse {
    user: {
        userLogin: string
        isActivated: boolean
        email: string | null
        name: string
        location: string
        banner: string
        avatar: string
        aboutMe: string
        skills: string
        hobbies: string
        userId: string
        followers: string[]
        following: string[]
    },
    tokens: TokensI
    posts: PostI[]
}