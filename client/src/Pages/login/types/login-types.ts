export type ServerError = {
    field: string
    message: string
}
export type Login = (accessToken: string, isActivated: boolean) => void
export type Registration = (userLogin: string, password: string, token: string) => Promise<string>
export type Validate = (userLogin: string, password: string) => Object