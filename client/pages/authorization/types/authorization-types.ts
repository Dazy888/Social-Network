export interface LoginInterface {
    login: string
    password: string
}
export interface ErrorItemsComponent  {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}
export interface AuthProps {
    userLogin: string
    password: string
}