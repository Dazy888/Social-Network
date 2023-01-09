import { PostType } from "../../profile/interfaces/interfaces"
export interface UserData {
    avatar: string
    banner: string
    name: string
    location: string
    aboutMe: string
    skills: string
    hobbies: string
    followers: string[],
    following: string[],
    posts: PostType[]
}