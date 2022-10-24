import { PostType } from "../../profile/types/Profile-Types"

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