import { Body, Controller, Delete, Post, Put, Param, Get, Headers } from '@nestjs/common'
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

    @Put('about-me')
    async setAboutMe(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.setAboutMe(data.text, data.id)
    }

    @Put('skills')
    async setSkillsText(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.setSkills(data.text, data.id)
    }

    @Put('hobbies')
    async setHobbiesText(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.setHobbies(data.text, data.id)
    }

    @Post('post')
    async createPost(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.createPost(data.text, data.id)
    }

    @Delete('post/:postId/:id')
    async deletePost(@Param('id') id: string, @Param('postId') postId: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.deletePost(postId)
    }

    @Get('avatar/:id')
    async getAvatar(@Param('id') id: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.getAvatar(id)
    }

    @Put('follow')
    async follow(@Body() data: SubscriptionDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.follow(data.authorizedUserId, data.openedUserId)
    }

    @Put('unfollow')
    async unfollow(@Body() data: SubscriptionDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId)
    }
}
