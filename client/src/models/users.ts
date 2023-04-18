import { IPost } from "@/models/profile"

export interface IUserData {
    avatar: string
    banner: string
    name: string
    location: string
    aboutMe: string
    skills: string
    hobbies: string
    followers: string[],
    following: string[],
    posts: IPost[]
}

export interface IUserPreview {
    userId: string
    name: string
    location: string
    avatar: string
}

export interface UsersResponse {
    usersData: IUserPreview[],
    length: number
}
