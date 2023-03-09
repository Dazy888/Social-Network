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
import { PostDto } from "@/dto/profile/post.dto"

@Injectable()
export class ProfileService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async setPhoto(newPath: string, field: string, model: any, userId: string) {
        (field === 'avatar') ? await model.findOneAndUpdate({ userId }, { avatar: `http://localhost:5000/${newPath}` }) : await model.findOneAndUpdate({ userId }, { banner: `http://localhost:5000/${newPath}` })
        return `http://localhost:5000/${newPath}`
    }

    async setName(name: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { name })
        return name
    }

    async setLocation(location: string, userId: string) {
        await this.userModel.findOneAndUpdate({ userId }, { location })
        return location
    }

    async setAvatar(newPath: string, userId: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'avatar', this.userModel, userId)
        } else {
            const previousPath = `uploads${currentPath.split('uploads')[1]}`
            fs.unlink(previousPath, (err) => err ? console.log(err) : console.log('File was deleted'))

            return this.setPhoto(newPath, 'avatar', this.userModel, userId)
        }
    }

    async setBanner(newPath: string, userId: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) {
            return this.setPhoto(newPath, 'banner', this.userModel, userId)
        } else {
            const lastPath = `uploads${currentPath.split('uploads')[1]}`
            fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))

            return this.setPhoto(newPath, 'banner', this.userModel, userId)
        }
    }

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
