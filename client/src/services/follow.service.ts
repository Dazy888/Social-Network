import { $api } from "@/http"

export class FollowService {
    static async follow(followerId: string, followeeId: string) {
        return $api.patch('profile/follow', { followerId, followeeId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }

    static async unfollow(followerId: string, followeeId: string) {
        return $api.post(`profile/unfollow`, { followerId, followeeId })
            .then((res) => res.data)
            .catch(err => { throw err.response.data.message })
    }
}
