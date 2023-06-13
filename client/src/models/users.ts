import { User } from "@/models/auth"
import { IPost } from "@/models/profile"

export interface PublicUserData extends Omit<User, 'email' | 'isActivated' | 'id' | 'activationLink'>{
    posts: IPost[]
}

export type IUserPreview = Pick<User, 'id' | 'name' | 'location' | 'avatar'>

export interface UsersResponse {
    usersData: IUserPreview[],
    length: number
}
