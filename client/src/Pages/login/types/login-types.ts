export type ServerError = {
    field: string
    message: string
}
export type Authorization = (accessToken: string, isActivated: boolean) => void
export type Validate = (userLogin: string, password: string) => Object