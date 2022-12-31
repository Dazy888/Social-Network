export interface ActivateInterface {
    email: string
}
export interface ChangePassInterface {
    pass: string
    newPass: string
    confirmPass: string
}
export interface NameInterface {
    name: string
}
export interface LocationInterface {
    location: string
}
export interface AvatarInterface {
    avatar: any
}
export interface BannerInterface {
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