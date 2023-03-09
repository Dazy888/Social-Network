import { diskStorage } from "multer"
// NestJS
import { Body, Controller, Delete, Post, Put, Param, UseInterceptors, UploadedFiles, Get } from '@nestjs/common'
import { FilesInterceptor } from "@nestjs/platform-express"
// DTO
import { TextDto } from "@/dto/settings/text.dto"
import { PhotoDto } from "@/dto/settings/photo.dto"
import { SubscriptionDto } from "@/dto/profile/subscription.dto"
// Service
import { ProfileService } from "./profile.service"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('name')
    async setName(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.setName(text, userId)
    }

    @Put('location')
    async setLocation(@Body() data: TextDto) {
        const { text, userId } = data
        return this.profileService.setLocation(text, userId)
    }

    @Post('avatar')
    @UseInterceptors(FilesInterceptor('image', null,
        {
            storage: diskStorage({
                destination: './uploads/avatars', filename: (req, file, callback) => {
                    callback(null, Date.now() + "--" + file.originalname)
                }
            })
        }))
    async setAvatar(@Body() data: PhotoDto, @UploadedFiles() file) {
        const { userId, currentPath } = data
        return this.profileService.setAvatar(file[0].path, userId, currentPath)
    }

    @Post('banner')
    @UseInterceptors(FilesInterceptor('image', 100,
        {
            storage: diskStorage({
                destination: './uploads/banners', filename: (req, file, callback) => {
                    callback(null, Date.now() + "--" + file.originalname)
                }
            })
        }))
    async setBanner(@Body() data: PhotoDto, @UploadedFiles() file) {
        const { userId, currentPath } = data
        return this.profileService.setBanner(file[0].path, userId, currentPath)
    }

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
