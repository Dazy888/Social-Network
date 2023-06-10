import { Model } from "mongoose"
import { v4 } from "uuid"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { PostDto } from "./dto/post.dto"
import { validateToken } from "../auth/auth.service"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async setAboutMe(aboutMe: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { aboutMe })
    }

    async setSkills(skills: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { skills })
    }

    async setHobbies(hobbies: string, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { hobbies })
    }

    async createPost(text: string, id: string) {
        await this.postModel.create({ text, userId: id })
    }

    async deletePost(postId: string) {
        await this.postModel.findOneAndDelete({ postId })
    }

    async getAvatar(_id: string) {
        const user = await this.userModel.findOne({ _id })
        return user.avatar
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        // const openedUser = await this.userModel.findOne({ _id: openedUserId })
        // const authorizedUser = await this.userModel.findOne({ _id: authorizedUserId })
        //
        // await this.userModel.findOneAndUpdate({ _id: openedUserId }, { followers: [...openedUser.followers, authorizedUserId] })
        // await this.userModel.findOneAndUpdate({ _id: authorizedUserId }, { following: [...authorizedUser.following, openedUserId] })

        await this.userModel.updateOne({ _id: openedUserId }, { $push: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $push: { following: openedUserId } })
    }

    async unfollow(authorizedUserId: string, openedUserId: string) {
        // const openedUser = await this.userModel.findOne({ userId: openedUserId })
        // const authorizedUser = await this.userModel.findOne({ userId: authorizedUserId })
        //
        // const openedUserFollowers = openedUser.followers
        // const authorizedUserFollowing = authorizedUser.following
        //
        // openedUserFollowers.splice(openedUserFollowers.indexOf(authorizedUserId), 1)
        // authorizedUserFollowing.splice(authorizedUserFollowing.indexOf(openedUserId), 1)
        //
        // await this.userModel.findOneAndUpdate({ userId: openedUserId }, {followers: openedUser.followers })
        // await this.userModel.findOneAndUpdate({ userId: authorizedUserId }, {following: authorizedUser.following })

        await this.userModel.updateOne({ _id: openedUserId }, { $pull: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $pull: { following: openedUserId } })
    }
}
