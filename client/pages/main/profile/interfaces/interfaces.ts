export type ChangeInfo = ({id, text}: TextProps) => Promise<void>
export type EditInfo = (event: any, changeText: ChangeInfo, value: string, textId: string, setStatus: (status: boolean) => void, setEditStatus: (status: boolean) => void, text: any, textarea: any, id: string) => any
export interface PostType {
    text: string
    date: Date
    id: string
    postId: string
}
export interface TextProps {
    text: string
    id: string
}
export interface SubscriptionProps {
    authorizedUserId: string
    openedUserId: string
}
export interface AvatarProps {
    id: string
}
export interface DeletePostProps {
    id: string
    userId: string
}