import { Body, Controller, Delete, Post, Put, Param, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FilesInterceptor } from "@nestjs/platform-express"
import { ChangeTextDto } from "./dto/change-text.dto"
import { ProfileService } from "./profile.service"
import {ChangePhotoDto} from "./dto/change-photo.dto"
import {DeletePostDto} from "./dto/delete-post.dto"
import {diskStorage} from "multer";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Put('name')
    async changeName(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeName(text, id)
    }

    @Put('location')
    async changeLocation(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeLocation(text, id)
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
    async changeAvatar(@Body() data, @UploadedFiles() file) {
        const {id, currentPath} = data
        return this.profileService.changeAvatar(file[0].path, id, currentPath)
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
    async changeBanner(@Body() data: ChangePhotoDto, @UploadedFiles() file) {
        const {id, currentPath} = data
        return this.profileService.changeBanner(file[0].path, id, currentPath)
    }

    @Put('about-me')
    async changeAboutMe(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeAboutMe(text, id)
    }

    @Put('hobbies')
    async changeHobbies(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeHobbies(text, id)
    }

    @Put('skills')
    async changeSkills(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeSkills(text, id)
    }

    @Post('post')
    async createPost(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.createPost(text, id)
    }

    @Delete('post/:postId/:userId')
    async deletePost(@Param('userId') userId: string, @Param('postId') postId: string) {
        return this.profileService.deletePost(postId, userId)
    }
}