import { IPost } from "@/models/profile"

export interface AuthForm {
    login: string
    pass: string
}

export interface ErrorComponentProps  {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export interface AuthProps {
    login: string
    pass: string
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse {
    tokens: Tokens
    user: {
        email: string
        isActivated: boolean
    }
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
    tokens: Tokens
    posts: IPost[]
}
