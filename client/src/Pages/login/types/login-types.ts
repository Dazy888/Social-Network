export type Login = (email: string, password: string) => Response
export type Registration = (email: string, password: string) => Response
export type Navigate = (path: string) => void
export type DefaultFunction = (value: string) => void
export type InputController = (changeInputValue: DefaultFunction, changeFieldError: DefaultFunction,  value: string) => void
export type Validate = (values: FormValues) => Object
export type FormValues = {
    email: string
    password: string
}
type ErrorType = {
    field: string
    message: string
}

export type Response = ErrorType & number