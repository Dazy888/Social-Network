import { Subscriptions, User } from "@/models/auth.models"
import { IPost } from "@/models/profile.models"

export interface PublicUserData extends Omit<User, 'email' | 'isActivated' | 'id' | 'activationLink'>{
    posts: IPost[]
    subscriptions: Subscriptions
}

export type IUserPreview = Pick<User, 'id' | 'name' | 'location' | 'avatar'>

export interface UsersResponse {
    usersData: IUserPreview[],
    length: number
}
