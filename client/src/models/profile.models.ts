import { Subscriptions } from "@/models/auth.models"

export type SubscriptionFunc = ({ authorizedUserId, openedUserId }: SubscriptionFuncParams) => void

interface SubscriptionFuncParams {
    authorizedUserId: string
    openedUserId: string
}

export interface IPost {
    userId: string
    createdAt: Date
    text: string
    _id: string
}

export interface TextProps {
    text: string
    userId: string
}

export interface SubscriptionParams {
    authorizedUserId: string
    openedUserId: string
}

export interface DeletePostParams {
    postId: string
}

export type ProfileIntroFields = 'aboutUserText' | 'userSkillsText' | 'userHobbiesText'

export interface ProfileIntro {
    text: string
    field: ProfileIntroFields
}

export interface ProfileInfo {
    name: string
    location: string
}

export interface SetProfileInfoProps extends ProfileInfo {
    id: string
}

export interface SetProfileImageParams {
    field: 'avatar' | 'banner'
    src: string
}

export interface UpdateProfileDTO {
    userId: string
    name: string
    location: string
    banner: string | null
    avatar: string | null
    aboutUserText: string
    userHobbiesText: string
    userSkillsText: string
}

export interface SetUserDTO {
    id: string
    profile: {
        banner: string
        avatar: string
        name: string
        location: string
        aboutUserText: string
        userHobbiesText: string
        userSkillsText: string
    }
    posts: IPost[]
    subscriptions: Subscriptions
}
