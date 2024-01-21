import {IUserProfile, Subscriptions} from "@/models/auth.models"

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
}

export interface SetProfileInfoDTO {
    name: string
    location: string
}

export interface SetProfileInfoProps extends ProfileInfo {
    id: string
    location: string
}

export interface SetProfileImageParams {
    field: 'avatar' | 'banner'
    src: string
}

export interface UpdateProfileDTO {
    userId?: string
    name?: string
    location?: string
    banner?: string | null
    avatar?: string | null
    aboutUserText?: string | null
    userHobbiesText?: string | null
    userSkillsText?: string | null
}

export interface SetUserDTO {
    id: string
    profile: IUserProfile
    posts: IPost[]
    subscriptions: Subscriptions
}
