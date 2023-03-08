import { Model } from "mongoose"
import * as fs from "fs"
import { v4 } from "uuid"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { UserDocument } from "@/schemas/user.schema"
import { PostDocument } from "@/schemas/post.schema"
// DTO
import { PostDto } from "@/dto/post.dto"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postsModel: Model<PostDocument>) {}

    async setPhoto(path: string, field: string, model: any, id: string) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId: id }, { avatar: `http://localhost:5000/${path}` }) : await model.findOneAndUpdate({ userId: id }, { banner: `http://localhost:5000/${path}` })
        return `http://localhost:5000/${path}`
    }

    async setName(name: string, id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { name })
        return name
    }

    async setLocation(location: string, id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { location })
        return location
    }

    async setAvatar(path: string, id: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) return this.setPhoto(path, 'avatar', this.userModel, id)
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return this.setPhoto(path, 'avatar', this.userModel, id)
    }

    async setBanner(path: string, id: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) return this.setPhoto(path, 'banner', this.userModel, id)
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return this.setPhoto(path, 'banner', this.userModel, id)
    }

    async setAboutMeText(text: string, id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { aboutMe: text })
        return text
    }

    async setHobbiesText(text: string, id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { hobbies: text })
        return text
    }

    async setSkillsText(text: string, id: string) {
        await this.userModel.findOneAndUpdate({ userId: id }, { skills: text })
        return text
    }

    async createPost(text: string, id: string) {
        const postModel = await this.postsModel.create({ text, date: new Date(), userId: id, postId: v4() })
        return new PostDto(postModel)
    }

    async deletePost(postId: string, userId: string) {
        await this.postsModel.findOneAndDelete({ postId: postId })
        return this.postsModel.find({ user: userId })
    }

    async getAvatar(id: string) {
        const user = await this.userModel.findOne({ userId: id })
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
