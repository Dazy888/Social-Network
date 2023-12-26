export interface AuthDto {
    username: string
    pass: string
}

export interface RecoverPassDTO {
    email: string
}

export interface SetNewPassDTO {
    recoveryLink: string
    newPass: string
}
