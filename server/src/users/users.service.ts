import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Mongoose
import { Model } from "mongoose"
// Schemas
import { User, UserDocument } from "../auth/schemas/user.schema"
import { Posts, PostsDocument } from "../auth/schemas/posts.schema"

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Posts.name) private postsModel: Model<PostsDocument>) {}

    async getUser(id: string) {
        const user = await this.userModel.findOne({userId: id})
        const posts = await this.postsModel.find({user: id})

        return {
            userData: user,
            posts: [...posts]
        }
    }

    async getUsers(skip: number, id: string) {
        const length = await this.userModel.count()
        const users = await this.userModel.find({userId: {$ne: id}}).skip(skip).limit(4)

        return {
            users,
            length
        }
    }
}
