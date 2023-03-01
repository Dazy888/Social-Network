import { $api } from "@/http"

export class UsersService {
    static async getUsers(skip: number, id: string) {
        return $api.get(`users/${skip}/${id}`)
    }

    static async getUser(id: string) {
        return $api.get(`users/${id}`)
    }
}