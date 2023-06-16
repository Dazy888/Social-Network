import { Model } from "mongoose"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"
import { Field } from "./models/profile.models"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async setProfileIntro(text: string, field: Field, _id: string) {
        await this.userModel.findOneAndUpdate({ _id }, { [field]: text })
    }

    async createPost(text: string, userId: string) {
        return this.postModel.create({ text, userId })
    }

    async deletePost(postId: string) {
        await this.postModel.findOneAndDelete({ postId })
    }

    async getAvatar(_id: string) {
        const user = await this.userModel.findOne({ _id })
        return user.avatar
    }

    async follow(authorizedUserId: string, openedUserId: string) {
        await this.userModel.updateOne({ _id: openedUserId }, { $push: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $push: { following: openedUserId } })
    }

    async unfollow(authorizedUserId: string, openedUserId: string) {
        await this.userModel.updateOne({ _id: openedUserId }, { $pull: { followers: authorizedUserId } })
        await this.userModel.updateOne({ _id: authorizedUserId }, { $pull: { following: openedUserId } })
    }
}
