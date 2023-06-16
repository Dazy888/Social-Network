export type SubscriptionFunc = ({ authorizedUserId, openedUserId }: SubscriptionFuncProps) => void

interface SubscriptionFuncProps {
    authorizedUserId: string
    openedUserId: string
}

export interface IPost {
    userId: string
    createdAt: Date
    text: string
    id: string
}

export interface TextProps {
    text: string
    id: string
}

export interface SubscriptionProps {
    authorizedUserId: string
    openedUserId: string
}

export interface DeletePostProps {
    postId: string
}

export type ProfileIntroFields = 'aboutMe' | 'skills' | 'hobbies'

export interface ProfileIntroProps {
    text: string
    field: ProfileIntroFields
}

export interface ProfileIntroForm {
    text: string
}
