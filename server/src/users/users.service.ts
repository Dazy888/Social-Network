import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { UserPreview } from "../interfaces/users.interfaces"
// Schemas
import { UserDocument } from "../schemas/user.schema"
import { PostDocument } from "../schemas/post.schema"

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async getUser(_id: string) {
        const user = await this.userModel.findOne({ _id })
        const posts = await this.postModel.find({ userId: _id })

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
            posts
        }
    }

    async getUsers(skip: number, id: string) {
        const length = await this.userModel.count()
        const users = await this.userModel.find({ userId: { $ne: id } }).skip(skip).limit(4)
        const usersData: UserPreview[] = []

        for (const user of users) {
            usersData.push(
                {
                    userId: user.id,
                    name: user.name,
                    location: user.location,
                    avatar: user.avatar,
                }
            )
        }

        return { usersData, length }
    }
}
