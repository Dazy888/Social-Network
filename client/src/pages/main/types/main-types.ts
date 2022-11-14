import { PostType } from "../../profile/types/profile-types"

export type User = {
    id: number
    email: string
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