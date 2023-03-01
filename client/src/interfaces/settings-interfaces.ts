export interface ActivateI {
    email: string
}

export interface ChangePassI {
    pass: string
    newPass: string
    confirmPass: string
}

export interface NameI {
    name: string
}

export interface LocationI {
    location: string
}

export interface AvatarI {
    avatar: any
}

export interface BannerI {
    banner: any
}

export interface ChangePassPropsI {
    pass: string
    newPass: string
    id: string
}

export interface ActivatePropsI {
    email: string
    id: string
}

export interface CancelActivationPropsI {
    id: string
}