export interface UserType {
    userId: string
    name: string
    location: string
    avatar: string
    aboutMe: string
    skills: string
    hobbies: string
}

export interface UsersResponse {
    users: UserType[],
    length: number
}