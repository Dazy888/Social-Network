import { Body, Controller, Delete, Post, Put, Param, Get, Headers, UseInterceptors, UploadedFile } from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express"
import { ProfileService } from "./profile.service"
import { checkToken } from "../auth/auth.controller"
import { validateToken } from "../auth/auth.service"
// Models
import { ProfileIntroProps, SetProfileImageProps } from "./models/profile.models"
import { SubscriptionProps, ChangeTextProps, SetProfileInfoProps } from "./models/profile.models"

export function checkAccessToken(authorization: string) {
    const accessToken = authorization.split(' ')[1]
    checkToken(accessToken)
    validateToken(accessToken, process.env.JWT_ACCESS_SECRET)
}

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('intro')
    async setProfileIntro(@Body() data: ProfileIntroProps, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.setProfileIntro(data.text, data.field, data.id)
    }

    @Post('post')
    async createPost(@Body() data: ChangeTextProps, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.createPost(data.text, data.id)
    }

    @Delete('post/:postId')
    async deletePost(@Param('postId') postId: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.deletePost(postId)
    }

    @Get('avatar/:id')
    async getAvatar(@Param('id') id: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.getAvatar(id)
    }

    @Put('profile-info')
    @UseInterceptors(AnyFilesInterceptor())
    async setProfileSettings(@Body() data: SetProfileInfoProps, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.setProfileInfo(data.id, data.name, data.location)
    }

    @Put('profile-image')
    @UseInterceptors(FileInterceptor('image'))
    async setProfileImage(@Body() data: SetProfileImageProps, @Headers('authorization') authorization: string, @UploadedFile() image: Express.Multer.File) {
        checkAccessToken(authorization)
        return this.profileService.uploadProfileImage(data.id, image, data.field)
    }

    @Put('follow')
    async follow(@Body() data: SubscriptionProps, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.follow(data.authorizedUserId, data.openedUserId)
    }

    @Put('unfollow')
    async unfollow(@Body() data: SubscriptionProps, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.unfollow(data.authorizedUserId, data.openedUserId)
    }
}
