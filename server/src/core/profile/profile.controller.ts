import {Body, Controller, Delete, Post, Put, Param, Get, UseInterceptors, UploadedFile, Patch} from '@nestjs/common'
import { FileInterceptor } from "@nestjs/platform-express"
import { ProfileService } from "./profile.service"
// DTOs
import {
    CreatePostDTO,
    SetProfileImageDTO,
    UpdateUserDTO
} from "../../dtos/profile.dto"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Put('update/:userId')
    updateUser(@Body() body: UpdateUserDTO, @Param('userId') userId: string) {
        return this.profileService.updateUser(body, userId)
    }

    @Post('post/create')
    createPost(@Body() body: CreatePostDTO) {
        return this.profileService.createPost(body)
    }

    @Delete('post/delete/:id')
    deletePost(@Param('id') id: string) {
        return this.profileService.deletePost(id)
    }

    @Get('avatar/:userId')
    getAvatar(@Param('userId') userId: string) {
        return this.profileService.getAvatar(userId)
    }

    @Patch('update-image')
    @UseInterceptors(FileInterceptor('image'))
    updateProfileImage(@Body() body: SetProfileImageDTO, @UploadedFile() image: Express.Multer.File) {
        return this.profileService.updateProfileImage(body.userId, image, body.field)
    }
}
