import { IPost } from "@/models/profile.models"

export interface IAuthForm {
    login: string
    pass: string
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export interface User {
    id: string
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
    followers: string[]
    following: string[]
}

export interface SignUpResponse {
    tokens: Tokens
    user: User
}

export interface SignInResponse extends SignUpResponse{
    posts: IPost[]
}

export interface RefreshResponse {
    user: User
    accessToken: string
    posts: IPost[]
}

export type PassInpType = 'text' | 'password'
