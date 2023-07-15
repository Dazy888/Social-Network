import { Subscriptions, User } from "@/models/auth.models"
import { IPost } from "@/models/profile.models"

export interface PublicUserData extends Omit<User, 'email' | 'isActivated' | 'id' | 'activationLink'>{
    posts: IPost[]
    subscriptions: Subscriptions
}

export interface IUserPreview extends Pick<User, 'name' | 'location' | 'avatar'>{
    userId: string
}

export interface UsersResponse {
    profiles: IUserPreview[],
    length: number
}
