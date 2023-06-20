export interface IActivate {
    email: string
}

export interface IChangePass {
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
    id: string
}

export interface ActivateProps {
    email: string
    id: string
}
