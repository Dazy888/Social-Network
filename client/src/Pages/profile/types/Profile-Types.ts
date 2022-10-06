export type ChangeName = (name: string, id: number) => string | void
export type ChangeLocation = (location: string, id: number) => void
export type ChangePhoto = (file: FormData) => void
export type ChangeInfo = (text: string, id: number) => void
export type AddPost = (text: string, id: number) => void
export type DeletePost = (id: number, userId: number) => void
export type PostType = {
    text: string
    date: Date
    id: number
}