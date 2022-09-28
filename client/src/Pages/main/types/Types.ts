import {Post} from "../../../store/reducers/profile/profile-reducer";

export type User = {
    banner: string
    avatar: string
    name: string
    location: string
    aboutMe: string
    hobbies: string
    skills: string
    posts: Array<Post>
}