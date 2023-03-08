import { diskStorage } from "multer"
// NestJS
import { Body, Controller, Delete, Post, Put, Param, UseInterceptors, UploadedFiles, Get } from '@nestjs/common'
import { FilesInterceptor } from "@nestjs/platform-express"
// DTO
import { SetTextDto } from "@/dto/setText.dto"
import { SetPhotoDto } from "@/dto/setPhoto.dto"
import { SubscriptionDto } from "@/dto/subscription.dto"
// Service
import { ProfileService } from "./profile.service"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('name')
    async setName(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.setName(text, id)
    }

    @Put('location')
    async setLocation(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.setLocation(text, id)
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
    async setAvatar(@Body() data, @UploadedFiles() file) {
        const { id, currentPath } = data
        return this.profileService.setAvatar(file[0].path, id, currentPath)
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
    async setBanner(@Body() data: SetPhotoDto, @UploadedFiles() file) {
        const { id, currentPath } = data
        return this.profileService.setBanner(file[0].path, id, currentPath)
    }

    @Put('about-me')
    async setAboutMeText(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.setAboutMeText(text, id)
    }

    @Put('hobbies')
    async setHobbiesText(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.setHobbiesText(text, id)
    }

    @Put('skills')
    async setSkillsText(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.setSkillsText(text, id)
    }

    @Post('post')
    async createPost(@Body() data: SetTextDto) {
        const { text, id } = data
        return this.profileService.createPost(text, id)
    }

    @Delete('post/:postId/:userId')
    async deletePost(@Param('userId') userId: string, @Param('postId') postId: string) {
        return this.profileService.deletePost(postId, userId)
    }

    @Get('avatar/:id')
    async getAvatar(@Param('id') id: string) {
        return this.profileService.getAvatar(id)
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
