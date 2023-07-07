import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"
import { ProfileDocument } from "../schemas/profile.schema"
import { SubscriptionDocument } from "../schemas/subscription.schema"

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Subscriptions') private subscriptionsModel: Model<SubscriptionDocument>
    ) {}

    async getUsers(skip: number, userId: string) {
        const length = await this.profileModel.count()
        const profiles: ProfileDocument[] = await this.profileModel.find({ userId: { $ne: userId } }, { userId: 1, name: 1, location: 1, avatar: 1, _id: 0 }).skip(skip).limit(20)
        return { profiles, length }
    }

    async getUser(userId: string) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId }, { name: 1, location: 1, avatar: 1, banner: 1, aboutMe: 1, skills: 1, hobbies: 1, _id: 0 })
        const posts: PostDocument[] = await this.postModel.find({ userId })
        const followers: SubscriptionDocument[] = await this.subscriptionsModel.find({ followedUserId: userId }, { userId: 1, _id: 0 })
        const followings: SubscriptionDocument[] = await this.subscriptionsModel.find({ userId }, { followedUserId: 1, _id: 0 })

        const followersIds = followers.map((follower) => follower.userId)
        const followingsIds = followings.map((following) => following.followedUserId)

        return {
            ...profile,
            posts,
            subscriptions: {
                followers: followersIds,
                followings: followingsIds
            }
        }
    }
}
