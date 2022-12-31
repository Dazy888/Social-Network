export interface LoginInterface {
    login: string
    password: string
}

export type ErrorItemsComponent = {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export type AuthProps = {
    userLogin: string
    password: string
}