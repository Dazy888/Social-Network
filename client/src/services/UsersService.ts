import {$api} from "../http"

export interface Users {
    id: number
    name: string
    location: string
    avatar: string
}

export const UsersService = {
    async getUsers() {
        return $api.get<Users>('users/get-all')
    }
}