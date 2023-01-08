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
    tokens: Tokens
    posts: PostType[]
}