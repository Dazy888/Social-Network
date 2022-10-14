export type ChangeName = (name: string, id: number) => Promise<string | void>
export type ChangeLocation = (location: string, id: number) => Promise<void>
export type ChangePhoto = (file: FormData) => Promise<void>
export type ChangeInfo = (text: string, id: number) => Promise<void>
export type AddPost = (text: string, id: number) => Promise<void>
export type DeletePost = (id: number, userId: number) => Promise<void>
export type PostType = {
    text: string
    date: Date
    id: number
}