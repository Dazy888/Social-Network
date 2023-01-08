export interface ITokens {
    accessToken: string
    refreshToken: string
}
export interface IUser {
    userLogin: string
    userId: string
    isActivated: boolean
    name: string
    location: string
    banner: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
    email: string | null
    followers: string[]
    following: string[]
    activationLink: string | null
}
export interface IPost {
    user: string
    postId: string
    date: string
    text: string
}
export interface RegistrationResponse {
    tokens: ITokens
    user: IUser
}
export interface ValidateRefreshTokenResponse extends IUser{
    iat: number
    exp: number
}
export interface FindTokenResponse {
    refreshToken: string
}
export interface RefreshResponse {
    posts: IPost[]
    user: IUser
    tokens: ITokens
}