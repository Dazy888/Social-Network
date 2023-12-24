import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
// Schemas
import { UserDocument } from "../../schemas/user.schema"
import { PostDocument } from "../../schemas/post.schema"
import { ProfileDocument } from "../../schemas/profile.schema"
import { FollowDocument } from "../../schemas/follow.schema"

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>,
        @InjectModel('Follow') private followModel: Model<FollowDocument>
    ) {}

    async getUsers(skip: number, userId: string) {
        const length = await this.profileModel.count()
        const filter = {
            userId: {
                $ne: userId
            }
        }

        const projection = {
            userId: 1,
            name: 1,
            location: 1,
            avatar: 1,
            _id: 0
        }

        const profiles: ProfileDocument[] = await this.profileModel.find(filter, projection).skip(skip).limit(20).lean()
        return {
            profiles,
            length
        }
    }

    async getUser(userId: string) {
        const projection = {
            name: 1,
            location: 1,
            avatar: 1,
            banner: 1,
            aboutMe: 1,
            skills: 1,
            hobbies: 1,
            _id: 0
        }

        const profile: ProfileDocument = await this.profileModel.findOne({ userId }, projection).lean()
        const posts: PostDocument[] = await this.postModel.find({ userId })
        const followers: FollowDocument[] = await this.followModel.find({ followeeId: userId })
        const followings: FollowDocument[] = await this.followModel.find({ userId })

        const followersId = followers.map((follower) => follower.followerId)
        const followingsId = followings.map((following) => following.followeeId)

        return {
            ...profile,
            posts,
            subscriptions: {
                followers: followersId,
                followings: followingsId
            }
        }
    }
}
