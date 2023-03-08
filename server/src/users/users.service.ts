import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Mongoose
import { Model } from "mongoose"
// Schemas
import { UserDocument } from "@/schemas/user.schema"
import { PostDocument } from "@/schemas/post.schema"
// Interfaces
import { GetUserResI, GetUsersResI, UserPreviewI } from "@/interfaces/users.interfaces"

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postsModel: Model<PostDocument>) {}

    async getUser(id: string): Promise<GetUserResI> {
        const user = await this.userModel.findOne({ userId: id })
        const posts = await this.postsModel.find({ userId: id })

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

    async getUsers(skip: number, id: string): Promise<GetUsersResI> {
        const length = await this.userModel.count()
        const users = await this.userModel.find({ userId: { $ne: id } }).skip(skip).limit(4)
        const usersData: UserPreviewI[] = []

        for (const user of users) {
            usersData.push(
                {
                    userId: user.userId,
                    name: user.name,
                    location: user.location,
                    avatar: user.avatar,
                }
            )
        }

        return {
            usersData,
            length
        }
    }
}
