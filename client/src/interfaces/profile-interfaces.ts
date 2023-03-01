export type ChangeInfoFunc = ({ id, text }: TextPropsI) => Promise<void>
export type EditInfoFunc = (event: any, changeText: ChangeInfoFunc, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textarea: any, id: string) => any

export interface PostI {
    text: string
    date: Date
    id: string
    postId: string
}

export interface TextPropsI {
    text: string
    id: string
}

export interface SubscriptionPropsI {
    authorizedUserId: string
    openedUserId: string
}

export interface AvatarPropsI {
    id: string
}

export interface DeletePostPropsI {
    id: string
    userId: string
}