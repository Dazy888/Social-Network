import { PostI } from "@/interfaces/profile-interfaces"

export interface UserDataI {
    avatar: string
    banner: string
    name: string
    location: string
    aboutMe: string
    skills: string
    hobbies: string
    followers: string[],
    following: string[],
    posts: PostI[]
}