import { v4 } from "uuid"
import * as dotenv from "dotenv"
import { Body, Controller, Get, Param, Post, Put, Res, UseInterceptors, Headers, Delete, Req, UploadedFiles } from '@nestjs/common'
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { checkAccessToken } from "../profile/profile.controller"
import { SettingsService } from "./settings.service"
// Models
import { ActivationProps, ChangePassProps, SetProfileSettingsProps } from "./models/settings.models"

dotenv.config()

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/password')
    async changePass(@Body() data: ChangePassProps, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id)
    }

    @Post('/activate-email')
    async sendMail(@Body() data: ActivationProps, @Headers('authorization') authorization: string) {
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

    @Put('profile-settings')
    @UseInterceptors(AnyFilesInterceptor())
    async setProfileSettings(@Body() data: SetProfileSettingsProps, @UploadedFiles() files: Express.Multer.File[]) {
        let banner
        let avatar

        files.forEach((item) => (item.fieldname === 'banner') ? banner = item : avatar = item)

        console.log(avatar)

        return this.settingsService.setProfileSettings(data.id, data, banner, avatar)
    }
}
