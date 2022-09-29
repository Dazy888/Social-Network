import {PostType} from "../../login/types/login-types"

export type User = {
    banner: string
    avatar: string
    name: string
    location: string
    aboutMe: string
    hobbies: string
    skills: string
    subscriptions: number
    posts: Array<PostType>
}