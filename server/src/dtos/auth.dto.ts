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

export interface GoogleSignInDTO {
    credential?: string
    select_by?: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm' | 'btn_add_session' | 'btn_confirm_add_session'
    clientId?: string
}
