import { Model } from "mongoose"
// NestJS
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
// Schema
import { User, UserDocument } from "../auth/schema/user.schema"

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getUsers() {
        return this.userModel.find()
    }
}
