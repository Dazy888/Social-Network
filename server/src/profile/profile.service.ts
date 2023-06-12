import { Model } from "mongoose"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
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

    async createPost(text: string, userId: string) {
        await this.postModel.create({ text, userId })
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
