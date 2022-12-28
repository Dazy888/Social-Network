export type ChangeInfo = ({id, text}: TextProps) => Promise<void>
export type PostType = {
    text: string
    date: Date
    id: number
    postId: number
}

export type TextProps = {
    text: string
    id: string
}

export interface ProfileInterface {
    name: string
    location: string
    banner: any
    avatar: any
}