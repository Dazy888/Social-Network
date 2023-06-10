import { v4 } from "uuid"
import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from "@nestjs/platform-express"
import { checkAccessToken } from "../profile/profile.controller"
import { SettingsService } from "./settings.service"
// DTO
import { PasswordDto } from "./dto/password.dto"
import { MailDto } from "./dto/mail.dto"
import { TextDto } from "./dto/text.dto"
import { PhotoDto } from "./dto/photo.dto"

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/pass/:accessToken')
    async changePass(@Body() data: PasswordDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id)
    }

    @Post('/mail/:accessToken')
    async sendMail(@Body() data: MailDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${v4()}`, data.id)
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res) {
        await this.settingsService.activate(link)
        res.redirect(`${process.env.CLIENT_URL}/main/settings/activate`)
    }

    @Get('/cancel-activation/:id/:accessToken')
    async cancelActivation(@Param('id') id: string, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        await this.settingsService.cancelActivation(id)
    }

    @Put('name/:accessToken')
    async setName(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.setName(data.text, data.id)
    }

    @Put('location/:accessToken')
    async setLocation(@Body() data: TextDto, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.setLocation(data.text, data.id)
    }

    @Post('avatar/:accessToken')
    @UseInterceptors(FileInterceptor('image'))
    async setAvatar(@Body() data: PhotoDto, @UploadedFile() image, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.uploadImage(image, 'avatar', data.id)
    }

    @Post('banner/:accessToken')
    @UseInterceptors(FileInterceptor('image'))
    async setBanner(@Body() data: PhotoDto, @UploadedFile() image, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.settingsService.uploadImage(image, 'banner', data.id)
    }
}
