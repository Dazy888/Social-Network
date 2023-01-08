export interface UserPreviewData {
    userId: string
    name: string
    location: string
    avatar: string
}
export interface UsersResponse {
    users: UserPreviewData[],
    length: number
}