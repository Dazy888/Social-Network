export interface Users {
    userId: string
    name: string
    location: string
    avatar: string
}
export interface UsersResponse {
    users: Users[],
    length: number
}