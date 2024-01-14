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
    activatedEmail: boolean
    email: string | null
    name: string
    location: string
    banner: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
}

export interface IUserProfile {
    name: string | null
    location: string | null
    banner: string
    avatar: string
    aboutUserText: string | null
    userHobbiesText: string | null
    userSkillsText: string | null
}

export interface ExtendedUser {
    activatedEmail: boolean
    email: string | null
    id: string
    profile: IUserProfile
    posts: IPost[]
    subscriptions: Subscriptions
}

export interface SignUpResponse {
    tokens: Tokens
    user: ExtendedUser
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
