export interface IActivate {
    email: string
}

export interface IChangePass {
    currentPass: string
    newPass: string
    confirmPass: string
}

export interface ChangePassParams {
    currentPass: string
    newPass: string
    userId: string
}

export interface ActivateEmailParams {
    email: string
    userId: string
}
