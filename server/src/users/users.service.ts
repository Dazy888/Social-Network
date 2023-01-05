import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Mongoose
import { Model } from "mongoose"
// Schema
import { User, UserDocument } from "../auth/schema/user.schema"
import { Posts, PostsDocument } from "../auth/schema/posts.schema"
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Posts.name) private postsModel: Model<PostsDocument>) {}
    async getUsers(skip: number, id: string) {
        const length = await this.userModel.count()
        const users = await this.userModel.find({userId: {$ne: id}}).skip(skip).limit(4)
        return {
            users,
            length
        }
    }
    async getUser(id: string) {
        const user = await this.userModel.findOne({userId: id})
        const posts = await this.postsModel.find({user: id})

        return {
            avatar: user.avatar,
            banner: user.banner,
            name: user.name,
            location: user.location,
            aboutMe: user.aboutMe,
            skills: user.skills,
            hobbies: user.hobbies,
            followers: user.followers,
            following: user.following,
            posts: [...posts]
        }
    }
}
