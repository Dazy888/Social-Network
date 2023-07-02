import {Body, Controller, Delete, Post, Put, Param, Get, Headers, UseInterceptors, UploadedFiles} from '@nestjs/common'
import { ProfileService } from "./profile.service"
import {SubscriptionProps, ChangeTextProps, SetProfileInfoProps} from "./models/profile.models"
import { checkToken } from "../auth/auth.controller"
import { validateToken } from "../auth/auth.service"
import { ProfileIntroProps } from "./models/profile.models"
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {SetProfileSettingsProps} from "@/settings/models/settings.models";

export function checkAccessToken(token: string) {
    checkToken(token)
    validateToken(token, process.env.JWT_ACCESS_SECRET)
}

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('intro')
    async setProfileIntro(@Body() data: ProfileIntroProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.setProfileIntro(data.text, data.field, data.id)
    }

    @Post('post')
    async createPost(@Body() data: ChangeTextProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.createPost(data.text, data.id)
    }

    @Delete('post/:postId')
    async deletePost(@Param('postId') postId: string, @Headers('authorization') authorization: string) {
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

    @Put('profile-info')
    @UseInterceptors(AnyFilesInterceptor())
    async setProfileSettings(@Body() data: SetProfileInfoProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.setProfileInfo(data.id, data.name, data.location)
    }

    @Put('follow')
    async follow(@Body() data: SubscriptionProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.follow(data.authorizedUserId, data.openedUserId)
    }

    @Put('unfollow')
    async unfollow(@Body() data: SubscriptionProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId)
    }
}
