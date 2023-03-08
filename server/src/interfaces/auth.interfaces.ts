import { PostI } from "@/interfaces/users.interfaces"

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IUser {
    userLogin: string
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

export interface RegistrationRes {
    tokens: ITokens
    user: IUser
}

export interface FindTokenRes {
    refreshToken: string
}

export interface RefreshRes {
    posts: PostI[]
    user: IUser
    tokens: ITokens
}
