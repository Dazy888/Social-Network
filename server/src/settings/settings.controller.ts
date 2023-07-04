import { v4 } from "uuid"
import * as dotenv from "dotenv"
import { Request, Response } from 'express'
import { Body, Controller, Get, Param, Post, Put, Res, Headers, Delete, Req } from '@nestjs/common'
import { checkAccessToken } from "../profile/profile.controller"
import { SettingsService } from "./settings.service"
import { ActivateEmailDto, ChangePassDto } from "./dtos/settings.dtos"

dotenv.config()

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/password')
    async changePass(@Body() data: ChangePassDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.settingsService.changePass(data.currentPass, data.newPass, data.id)
    }

    @Post('/activate-email')
    async sendMail(@Body() data: ActivateEmailDto, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activate/${v4()}`, data.id)
    }

    @Delete('/cancel-activation/:id')
    async cancelActivation(@Param('id') id: string, @Headers('authorization') authorization: string) {
        checkAccessToken(authorization)
        await this.settingsService.cancelActivation(id)
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
        const fullUrl = `https://${req.get('host')}${req.originalUrl}`
        await this.settingsService.activate(fullUrl)
        res.redirect(`${process.env.CLIENT_URL}/settings/activate`)
    }
}
