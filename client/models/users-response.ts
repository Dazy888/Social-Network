export interface UsersPreviewData {
    userId: string
    name: string
    location: string
    avatar: string
}
export interface UsersResponse {
    users: UsersPreviewData[],
    length: number
}