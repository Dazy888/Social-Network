export type SetInfoFunc = ({ userId, text }: TextProps) => Promise<void>
export type EditInfoFunc = (event: any, changeText: SetInfoFunc, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textarea: any, id: string) => any
export type SubscriptionFunc = ({ authorizedUserId, openedUserId }: SubscriptionFuncProps) => void

interface SubscriptionFuncProps {
    authorizedUserId: string
    openedUserId: string
}

export interface IPost {
    userId: string
    date: Date
    text: string
    postId: string
}

export interface TextProps {
    text: string
    userId: string
}

export interface SubscriptionProps {
    authorizedUserId: string
    openedUserId: string
}

export interface AvatarProps {
    userId: string
}

export interface DeletePostProps {
    postId: string
    userId: string
}
