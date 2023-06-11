import { User } from "@/models/auth"
import { IPost } from "@/models/profile"

export interface PublicUserData extends Omit<User, 'email' | 'isActivated' | 'id' | 'activationLink'>{
    posts: IPost[]
}

export interface IUserPreview {
    userId: string
    name: string
    location: string
    avatar: string
}

export interface UsersResponse {
    usersData: Pick<User, 'id' | 'name' | 'location' | 'avatar'>[],
    length: number
}
