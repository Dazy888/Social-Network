export interface AuthFormI {
    login: string
    password: string
}

export interface ErrorComponentPropsI  {
    error: string | undefined
    serverError?: string
    touched: boolean | undefined
}

export interface AuthPropsI {
    userLogin: string
    password: string
}