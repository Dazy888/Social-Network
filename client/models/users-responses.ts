export interface UsersPreviewData {
    userId: string
    name: string
    location: string
    avatar: string
}
export interface UsersResponses {
    users: UsersPreviewData[],
    length: number
}