export type ChangeInfo = ({id, text}: TextProps) => Promise<void>
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