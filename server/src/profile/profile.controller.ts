import {Body, Controller, Delete, Post, Put, Request} from '@nestjs/common'
import { ChangeTextDto } from "./dto/change-text.dto"
import { ProfileService } from "./profile.service"
import {ChangePhotoDto} from "./dto/change-photo.dto"
import {DeletePostDto} from "./dto/delete-post.dto"

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Put('/name')
    async changeName(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeName(text, id)
    }

    @Put('/location')
    async changeLocation(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeLocation(text, id)
    }

    @Put('/avatar')
    async changeAvatar(@Body() data: ChangePhotoDto, @Request() req) {
        const {id, currentPath} = data
        return this.profileService.changeAvatar(req.file.path, id, currentPath)
    }

    @Put('/banner')
    async changeBanner(@Body() data: ChangePhotoDto, @Request() req) {
        const {id, currentPath} = data
        return this.profileService.changeBanner(req.file.path, id, currentPath)
    }

    @Put('/about-me')
    async changeAboutMe(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeAboutMe(text, id)
    }

    @Put('/hobbies')
    async changeHobbies(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeHobbies(text, id)
    }

    @Put('/skills')
    async changeSkills(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.changeSkills(text, id)
    }

    @Post('/post')
    async createPost(@Body() data: ChangeTextDto) {
        const {text, id} = data
        return this.profileService.createPost(text, id)
    }

    @Delete('/post')
    async deletePost(@Body() data: DeletePostDto) {
        const {id, userId} = data
        return this.profileService.deletePost(id, userId)
    }
}