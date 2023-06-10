import { Body, Controller, Delete, Post, Put, Param, Get } from '@nestjs/common'
import { ProfileService } from "./profile.service"
import { TextDto } from "../settings/dto/text.dto"
import { SubscriptionDto } from "./dto/subscription.dto"
import { checkToken } from "../auth/auth.controller"
import { validateToken } from "../auth/auth.service"

export function checkAccessToken(token: string) {
    checkToken(token)
    validateToken(token, process.env.JWT_ACCESS_SECRET)
}

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('about-me/:accessToken')
    async setAboutMe(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.setAboutMe(data.text, data.id)
    }

    @Put('skills/:accessToken')
    async setSkillsText(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.setSkills(data.text, data.id)
    }

    @Put('hobbies/:accessToken')
    async setHobbiesText(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.setHobbies(data.text, data.id)
    }

    @Post('post/:accessToken')
    async createPost(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.createPost(data.text, data.id)
    }

    @Delete('post/:postId/:id/:accessToken')
    async deletePost(@Param('id') id: string, @Param('postId') postId: string, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.deletePost(postId)
    }

    @Get('avatar/:id/:accessToken')
    async getAvatar(@Param('id') id: string, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.getAvatar(id)
    }

    @Put('follow/:accessToken')
    async follow(@Body() data: SubscriptionDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.follow(data.authorizedUserId, data.openedUserId)
    }

    @Put('unfollow/:accessToken')
    async unfollow(@Body() data: SubscriptionDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId)
    }
}
