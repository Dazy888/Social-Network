import { v4 } from "uuid"
import * as dotenv from "dotenv"
import { Request, Response } from 'express'
import { Body, Controller, Get, Param, Post, Put, Res, Headers, Delete, Req } from '@nestjs/common'
import { checkAccessToken } from "../profile/profile.controller"
import { SettingsService } from "./settings.service"
import { ActivateEmailDto, ChangePassDto } from "../../dtos/settings.dto"

dotenv.config()

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/changePassword')
    async changePass(@Body() body: ChangePassDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.settingsService.changePass(body.currentPass, body.newPass, body.id)
    }

    @Post('/activateEmail')
    async sendMail(@Body() data: ActivateEmailDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activateEmail/${v4()}`, data.id)
    }

    @Delete('/cancelEmailActivation/:userId')
    async cancelActivation(@Param('userId') userId: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        await this.settingsService.cancelEmailActivation(userId)
    }

    @Get('/activateEmail/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const fullUrl = `https://${req.get('host')}${req.originalUrl}`
        await this.settingsService.activateEmail(fullUrl)
        res.redirect(`${process.env.CLIENT_URL}/settings/email`)
    }
}
