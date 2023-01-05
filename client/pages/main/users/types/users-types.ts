import { PostType } from "../../profile/types/profile-types"
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