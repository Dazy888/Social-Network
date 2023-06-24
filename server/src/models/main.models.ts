export interface User {
    id: string
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

export interface UserPreview {
    id: string
    name: string
    location: string
    avatar: string
}

