import { v4 } from "uuid"
import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors, Headers } from '@nestjs/common'
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

    @Put('/pass')
    async changePass(@Body() data: PasswordDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id)
    }

    @Post('/mail')
    async sendMail(@Body() data: MailDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${v4()}`, data.id)
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res) {
        await this.settingsService.activate(link)
        res.redirect(`${process.env.CLIENT_URL}/main/settings/activate`)
    }

    @Get('/cancel-activation/:id')
    async cancelActivation(@Param('id') id: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        await this.settingsService.cancelActivation(id)
    }

    @Put('name')
    async setName(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.setName(data.text, data.id)
    }

    @Put('location')
    async setLocation(@Body() data: TextDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.setLocation(data.text, data.id)
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('image'))
    async setAvatar(@Body() data: PhotoDto, @UploadedFile() image, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.uploadImage(image, 'avatar', data.id)
    }

    @Post('banner')
    @UseInterceptors(FileInterceptor('image'))
    async setBanner(@Body() data: PhotoDto, @UploadedFile() image, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.uploadImage(image, 'banner', data.id)
    }
}
