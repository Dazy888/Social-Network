export interface IActivate {
    email: string
}
export interface IChangePass {
    pass: string
    newPass: string
    confirmPass: string
}
export interface IName {
    name: string
}
export interface ILocation {
    location: string
}
export interface IAvatar {
    avatar: any
}
export interface IBanner {
    banner: any
}
export interface ChangePassProps {
    pass: string
    newPass: string
    id: string
}
export interface ActivateProps {
    email: string
    id: string
}
export interface CancelActivationProps {
    id: string
}