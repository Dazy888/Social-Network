import { Model } from "mongoose"
import { v4 } from "uuid"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { UserDocument } from "@/schemas/user.schema"
import { PostDocument } from "@/schemas/post.schema"
// DTO
import { PostDto } from "@/dto/profile/post.dto"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async setAboutMe(text: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { aboutMe: text })
        return text
    }

    async setSkills(text: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { skills: text })
        return text
    }

    async setHobbies(text: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { hobbies: text })
        return text
    }

    async createPost(text: string, userId: string) {
        const postModel = await this.postModel.create({ text, date: new Date(), userId, postId: v4() })
        return new PostDto(postModel)
    }

    async deletePost(postId: string, userId: string) {
        await this.postModel.findOneAndDelete({ postId })
        return this.postModel.find({ userId })
    }

    async getAvatar(userId: string) {
        const user = await this.userModel.findOne({ userId })
        return user.avatar
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        const openedUser = await this.userModel.findOne({ userId: openedUserId })
        const authorizedUser = await this.userModel.findOne({ userId: authorizedUserId })

        await this.userModel.findOneAndUpdate({ userId: openedUserId }, { followers: [...openedUser.followers, authorizedUserId] })
        await this.userModel.findOneAndUpdate({ userId: authorizedUserId }, { following: [...authorizedUser.following, openedUserId] })
    }

    async unfollow(authorizedUserId: string, openedUserId: string) {
        const openedUser = await this.userModel.findOne({ userId: openedUserId })
        const authorizedUser = await this.userModel.findOne({ userId: authorizedUserId })

        const openedUserFollowers = openedUser.followers
        const authorizedUserFollowing = authorizedUser.following

        openedUserFollowers.splice(openedUserFollowers.indexOf(authorizedUserId), 1)
        authorizedUserFollowing.splice(authorizedUserFollowing.indexOf(openedUserId), 1)

        await this.userModel.findOneAndUpdate({ userId: openedUserId }, {followers: openedUser.followers })
        await this.userModel.findOneAndUpdate({ userId: authorizedUserId }, {following: authorizedUser.following })
    }
}
