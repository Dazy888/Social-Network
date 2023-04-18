export interface IActivate {
    email: string
}

export interface ISetPass {
    currentPass: string
    newPass: string
    confirmPass: string
}

export interface INameForm {
    name: string
}

export interface ILocationForm {
    location: string
}

export interface IAvatarForm {
    avatar: any
}

export interface IBannerForm {
    banner: any
}

export interface SetPassProps {
    currentPass: string
    newPass: string
    userId: string
}

export interface ActivateProps {
    email: string
    userId: string
}

export interface CancelActivationProps {
    userId: string
}
