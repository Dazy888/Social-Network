import { Body, Controller, Delete, Post, Put, Param, Get, Headers, UseInterceptors, UploadedFile } from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express"
import { ProfileService } from "./profile.service"
// Token functions
import { checkToken } from "../auth/auth.controller"
import { validateToken } from "../auth/auth.service"
// DTOs
import { CreatePostDto, FollowDto, SetProfileImageDto, SetProfileInfoDto, SetProfileIntroDto } from "../../dtos/profile.dto"

export function checkAccessToken(authorization: string) {
    const accessToken = authorization.split(' ')[1]
    checkToken(accessToken)
    validateToken(accessToken, process.env.JWT_ACCESS_SECRET)
}

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('updateIntro')
    async setProfileIntro(@Body() body: SetProfileIntroDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.updateIntro(body.text, body.field, body.id)
    }

    @Post('post')
    async createPost(@Body() body: CreatePostDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.createPost(body.text, body.id)
    }

    @Delete('post/:postId')
    async deletePost(@Param('postId') postId: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.deletePost(postId)
    }

    @Get('avatar/:userId')
    async getAvatar(@Param('userId') userId: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.getAvatar(userId)
    }

    @Put('updateProfileInfo')
    @UseInterceptors(AnyFilesInterceptor())
    async updateProfileInfo(@Body() body: SetProfileInfoDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.updateProfileInfo(body.id, body.name, body.location)
    }

    @Put('updateImage')
    @UseInterceptors(FileInterceptor('image'))
    async updateProfileImage(@Body() body: SetProfileImageDto, @Headers('authorization') authorization: string, @UploadedFile() image: Express.Multer.File) {
        checkAccessToken(authorization)
        return this.profileService.updateProfileImage(body.id, image, body.field)
    }

    @Put('follow')
    async follow(@Body() body: FollowDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.follow(body.authorizedUserId, body.openedUserId)
    }

    @Delete('unfollow/:userId')
    async unfollow(@Param('userId') userId: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.profileService.unfollow(userId)
    }
}
