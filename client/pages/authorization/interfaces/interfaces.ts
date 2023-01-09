export interface IAuth {
    login: string
    password: string
}
export interface ErrorComponentProps  {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}
export interface AuthProps {
    userLogin: string
    password: string
}