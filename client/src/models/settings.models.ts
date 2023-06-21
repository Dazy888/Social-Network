export interface IActivate {
    email: string
}

export interface IChangePass {
    currentPass: string
    newPass: string
    confirmPass: string
}

export interface ProfileSettings {
    name: string
    location: string
}

export interface ProfileSettingsResponse extends ProfileSettings {
    avatar: string
    banner: string
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
