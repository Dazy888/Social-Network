import { Body, Controller, Delete, Post, Put, Param, Get } from '@nestjs/common'
// DTO
import { TextDto } from "@/dto/settings/text.dto"
import { SubscriptionDto } from "@/dto/profile/subscription.dto"
// Service
import { ProfileService } from "./profile.service"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('about-me')
    async setAboutMeText(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.setAboutMe(text, userId)
    }

    @Put('skills')
    async setSkillsText(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.setSkills(text, userId)
    }

    @Put('hobbies')
    async setHobbiesText(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.setHobbies(text, userId)
    }

    @Post('post')
    async createPost(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.createPost(text, userId)
    }

    @Delete('post/:postId/:userId')
    async deletePost(@Param('userId') userId: string, @Param('postId') postId: string) {
        return this.profileService.deletePost(postId, userId)
    }

    @Get('avatar/:userId')
    async getAvatar(@Param('userId') userId: string) {
        return this.profileService.getAvatar(userId)
    }

    @Put('follow')
    async follow(@Body() data: SubscriptionDto) {
        return this.profileService.follow(data.authorizedUserId, data.openedUserId)
    }

    @Put('unfollow')
    async unfollow(@Body() data: SubscriptionDto) {
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId)
    }
}
