import { v4 } from "uuid"
import * as dotenv from "dotenv"
import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors, Headers, Delete, Req } from '@nestjs/common'
import { FileInterceptor } from "@nestjs/platform-express"
import { checkAccessToken } from "../profile/profile.controller"
import { SettingsService } from "./settings.service"
// DTO
import { PasswordDto } from "./dto/password.dto"
import { MailDto } from "./dto/mail.dto"
import { TextDto } from "./dto/text.dto"
import { PhotoDto } from "./dto/photo.dto"

dotenv.config()

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/pass')
    async changePass(@Body() data: PasswordDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id)
    }

    @Post('/activation')
    async sendMail(@Body() data: MailDto, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${v4()}`, data.id)
    }

    @Delete('/cancel-activation/:id')
    async cancelActivation(@Param('id') id: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        await this.settingsService.cancelActivation(id)
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res, @Req() req) {
        const fullUrl = `https://${req.get('host')}${req.originalUrl}`
        await this.settingsService.activate(fullUrl)
        res.redirect(`${process.env.CLIENT_URL}/settings/activate`)
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
