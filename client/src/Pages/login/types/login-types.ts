// Authorization
export type ServerError = {
    field: string
    message: string
}
export type Login = (email: string, password: string, reCaptchaToken: string) => Promise<number & ServerError>
export type Registration = (email: string, password: string, reCaptchaToken: string) => Promise<number & ServerError>
// Navigation
export type Navigate = (path: string) => void
// Form
export type DefaultFunction = (value: string) => void
export type InputController = (changeInputValue: DefaultFunction, changeFieldError: DefaultFunction,  value: string) => void
export type Validate = (values: FormValues) => Object
export type FormValues = {
    userName: string
    password: string
}