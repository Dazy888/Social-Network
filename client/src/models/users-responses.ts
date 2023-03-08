export interface UserPreviewI {
    userId: string
    name: string
    location: string
    avatar: string
}

export interface UsersResponseI {
    usersData: UserPreviewI[],
    length: number
}