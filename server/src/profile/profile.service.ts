import { Model } from "mongoose"
import * as fs from "fs"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schemas
import { User, UserDocument } from "../auth/schema/user.schema"
import { Posts, PostsDocument } from "../auth/schema/posts.schema"
// DTO
import { PostDto } from "./dto/post.dto"
@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Posts.name) private postsModel: Model<PostsDocument>) {}
    async updatePhoto(path: string, field: string, model: any, id: string) {
        (field === 'avatar') ? await model.findOneAndUpdate({userId: id}, {avatar: `http://localhost:5000/${path}`}) : await model.findOneAndUpdate({userId: id}, {banner: `http://localhost:5000/${path}`})
        return `http://localhost:5000/${path}`
    }
    async changeName(name: string, id: string) {
        await this.userModel.findOneAndUpdate({userId: id}, {name})
        return name
    }
    async changeLocation(location: string, id: string) {
        await this.userModel.findOneAndUpdate({userId: id}, {location})
        return location
    }
    async changeAvatar(path: string, id: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) return this.updatePhoto(path, 'avatar', this.userModel, id)
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return this.updatePhoto(path, 'avatar', this.userModel, id)
    }
    async changeBanner(path: string, id: string, currentPath: string) {
        if (!/uploads/.test(currentPath)) return this.updatePhoto(path, 'banner', this.userModel, id)
        const lastPath = `uploads${currentPath.split('uploads')[1]}`
        fs.unlink(lastPath, (err) => err ? console.log(err) : console.log('File was deleted'))
        return this.updatePhoto(path, 'banner', this.userModel, id)
    }
    async changeAboutMe(text: string, id: string) {
        await this.userModel.findOneAndUpdate({userId: id}, {aboutMe: text})
        return text
    }
    async changeHobbies(text: string, id: string) {
        await this.userModel.findOneAndUpdate({userId: id}, {hobbies: text})
        return text
    }
    async changeSkills(text: string, id: string) {
        await this.userModel.findOneAndUpdate({userId: id}, {skills: text})
        return text
    }
    async createPost(text: string, id: string) {
        const randomNum: any = Math.floor(Math.random() * ((99999999999 - 1111111111) + 1111111111))
        const postModel = await this.postsModel.create({text, date: new Date(), user: id, postId: randomNum})
        return new PostDto(postModel)
    }
    async deletePost(postId: string, userId: string) {
        await this.postsModel.findOneAndDelete({postId: postId})
        return this.postsModel.find({user: userId})
    }
}
