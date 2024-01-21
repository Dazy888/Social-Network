import { $api } from "@/http"

export class FollowService {
    static async follow(followerId: string, followeeId: string) {
        return $api.post('follow/create', { followerId, followeeId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async unfollow(followerId: string, followeeId: string) {
        return $api.post(`follow/delete`, { followerId, followeeId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
