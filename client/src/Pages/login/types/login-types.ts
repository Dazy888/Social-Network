export type ServerError = {
    field: string
    message: string
}
export type Login = (userLogin: string, password: string, reCaptchaToken: string) => Promise<number & ServerError>
export type Registration = (userLogin: string, password: string, token: string) => Promise<string>
export type Validate = (userLogin: string, password: string) => Object