import { IPost } from "@/models/profile.models"

export type Action = 'signIn' | 'signUp'

export interface IAuthForm {
    username: string
    pass: string
}

export interface IRecoverForm {
    email: string
}

export interface INewPassForm {
    newPass: string
    confirmPass: string
}

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export interface Subscriptions {
    followers: string[]
    followings: string[]
}

export interface User {
    id: string
    isEmailActivated: boolean
    email: string | null
    name: string
    location: string
    banner: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
}

export interface ExtendedUser {
    id: string
    isEmailActivated: boolean
    email: string | null
    name: string
    location: string
    banner: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
    posts: IPost[]
    subscriptions: Subscriptions
}

export interface SignUpResponse {
    tokens: Tokens
    user: User
}

export interface SignInResponse {
    tokens: Tokens
    user: ExtendedUser
}

export interface RefreshResponse {
    user: ExtendedUser
    accessToken: string
}

export interface SetNewPassDTO {
    newPass: string
    recoveryLink: string
}
