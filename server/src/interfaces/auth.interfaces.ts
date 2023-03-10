import { IPost } from "@/interfaces/users.interfaces"

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IUser {
    userId: string
    isActivated: boolean
    name: string
    location: string
    banner: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
    email: string | null
    followers: string[]
    following: string[]
    activationLink: string | null
}

export interface RegistrationResponse {
    tokens: ITokens
    user: IUser
}

export interface FindTokenResponse {
    refreshToken: string
}

export interface RefreshResponse {
    posts: IPost[]
    user: IUser
    tokens: ITokens
}
