export interface ChangePassDto {
    userId: string
    currentPass: string
    newPass: string
}

export class ActivateEmailDto {
    userId: string
    email: string
}
