import { IPost } from "@/models/profile"

export interface IAuthForm {
    login: string
    password: string
}

export interface ErrorComponentProps  {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export interface AuthProps {
    userLogin: string
    password: string
}

export interface IAuthUser {
    email: string
    isActivated: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse {
    tokens: ITokens
    user: IAuthUser
}

export interface RefreshResponse {
    user: {
        userLogin: string
        password: string
        isActivated: boolean
        email: string | null
        activationLink: string | null
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
    tokens: ITokens
    posts: IPost[]
}
