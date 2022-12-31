import { PostType } from "../pages/main/profile/types/profile-types"
export interface AuthUser {
    email: string
    isActivated: boolean
}
export interface Tokens {
    accessToken: string
    refreshToken: string
}
export interface AuthResponse {
    tokens: Tokens
    user: AuthUser
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
        userId: string
    },
    tokens: Tokens
    posts: PostType[]
}