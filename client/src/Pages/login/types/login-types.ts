// Authorization
export type ServerError = {
    field: string
    message: string
}
export type Login = (userLogin: string, password: string, reCaptchaToken: string) => Promise<number & ServerError>
export type Registration = (userLogin: string, password: string, token: string) => Promise<number & ServerError>
// Navigation
export type Navigate = (path: string) => void
// Form
export type Validate = (userLogin: string, password: string) => Object
// Profile
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