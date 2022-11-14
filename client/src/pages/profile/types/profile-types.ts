export type ChangeInfo = ({id, text}: TextProps) => Promise<void>
export type PostType = {
    text: string
    date: Date
    id: number
}

export type TextProps = {
    text: string
    id: number
}