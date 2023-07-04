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
    id: string
}

export interface SubscriptionParams {
    authorizedUserId: string
    openedUserId: string
}

export interface DeletePostParams {
    postId: string
}

export type ProfileIntroFields = 'aboutMe' | 'skills' | 'hobbies'

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
