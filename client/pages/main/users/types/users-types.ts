import { PostType } from "../../profile/types/profile-types"

export type UserData = {
    avatar: string
    banner: string
    name: string
    location: string
    aboutMe: string
    skills: string
    hobbies: string
    posts: PostType[]
}