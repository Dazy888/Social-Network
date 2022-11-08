import { Model } from "mongoose"
import * as fs from "fs"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { User, UserDocument } from "../auth/schema/user.schema"
import {Posts, PostsDocument} from "../auth/schema/posts.schema"
// DTO
import {PostDto} from "./dto/post.dto"

@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Posts.name) private postsModel: Model<PostsDocument>) {}

    async changeName(name: string, id: string) {
        if (await this.userModel.findOne({name})) return 'User with this name already exists'
        await this.userModel.findByIdAndUpdate({_id: id}, {name})
        return name
    }

    async changeLocation(location: string, id: string) {
        await this.userModel.findByIdAndUpdate({_id: id}, {location})
        return location
    }

    async changeAvatar(path: string, id: string, currentPath: string) {
        async function updatePhoto(model) {
            await model.findByIdAndUpdate({_id: id}, {avatar: `http://localhost:5001/${path}`})
            return `http://localhost:5001/${path}`
        }

        if (!/uploads/.test(currentPath)) return updatePhoto(this.userModel)

        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return updatePhoto(this.userModel)
    }

    async changeBanner(path: string, id: string, currentPath: string) {
        async function updatePhoto(model) {
            await model.findByIdAndUpdate({_id: id}, {banner: `http://localhost:5001/${path}`})
            return `http://localhost:5001/${path}`
        }

        if (!/uploads/.test(currentPath)) return updatePhoto(this.userModel)

        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return updatePhoto(this.userModel)
    }

    async changeAboutMe(text: string, id: string) {
        await this.userModel.findByIdAndUpdate({_id: id}, {aboutMe: text})
        return text
    }

    async changeHobbies(text: string, id: string) {
        await this.userModel.findByIdAndUpdate({_id: id}, {hobbies: text})
        return text
    }

    async changeSkills(text: string, id: string) {
        await this.userModel.findByIdAndUpdate({_id: id}, {skills: text})
        return text
    }

    async createPost(text: string, id: string) {
        const postModel = await this.postsModel.create({text, date: new Date(), user: id})
        return new PostDto(postModel)
    }

    async deletePost(postId: string, userId: string) {
        await this.postsModel.findByIdAndDelete({_id: postId})
        return this.postsModel.find({user: userId})
    }
}