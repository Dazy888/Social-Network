import { Body, Controller, Post } from '@nestjs/common'
import { FollowService } from "./follow.service"
import { FollowDTO } from "../../dtos/follow.dto"

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Post('create')
    follow(@Body() body: FollowDTO) {
        return this.followService.follow(body)
    }

    @Post('delete')
    unfollow(@Body() body: FollowDTO) {
        return this.followService.unfollow(body)
    }
}
