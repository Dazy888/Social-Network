import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserPreview } from "../models/main.models"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"
import { ProfileDocument } from "../schemas/profile.schema"
import { SubscriptionsDocument } from "../schemas/subscriptions.schema"

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Profile') private profileModel: Model<ProfileDocument>,
        @InjectModel('Post') private postModel: Model<PostDocument>, @InjectModel('Subscriptions') private subscriptionsModel: Model<SubscriptionsDocument>
    ) {}

    async getUsers(skip: number, userId: string) {
        const length = await this.profileModel.count()
        const profiles: ProfileDocument[] = await this.profileModel.find({ userId: { $ne: userId } }).skip(skip).limit(20)
        const usersData: UserPreview[] = []

        for (const profile of profiles) {
            usersData.push(
                {
                    id: profile.userId,
                    name: profile.name,
                    location: profile.location,
                    avatar: profile.avatar,
                }
            )
        }

        return { usersData, length }
    }

    async getUser(userId: string) {
        const profile: ProfileDocument = await this.profileModel.findOne({ userId })
        delete profile.userId
        const posts: PostDocument[] = await this.postModel.find({ userId })
        const subscriptions = await this.subscriptionsModel.find({ userId })

        return {
            ...profile,
            ...subscriptions,
            posts
        }
    }
}
