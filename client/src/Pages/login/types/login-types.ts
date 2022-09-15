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
export type ChangeHeaderData = (name: string, location: string, currentName: string) => string | null