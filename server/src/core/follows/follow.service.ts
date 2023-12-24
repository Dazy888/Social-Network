import { Model } from "mongoose"
import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { FollowDocument } from "../../schemas/follow.schema"
import { FollowDTO } from "../../dtos/follow.dto"

@Injectable()
export class FollowService {
    constructor(@InjectModel('Follow') private followModel: Model<FollowDocument>) {}

    async follow(data: FollowDTO) {
        await this.followModel.create(data)
    }

    async unfollow(data: FollowDTO) {
        await this.followModel.deleteOne(data)
    }
}
