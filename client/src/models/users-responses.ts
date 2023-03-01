export interface UserPreviewDataI {
    userId: string
    name: string
    location: string
    avatar: string
}

export interface UsersResponse {
    users: UserPreviewDataI[],
    length: number
}