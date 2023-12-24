import { v4 } from "uuid"
import { Request, Response } from 'express'
import { Body, Controller, Get, Param, Post, Res, Delete, Req, Patch } from '@nestjs/common'
import { SettingsService } from "./settings.service"
import { ActivateEmailDto, ChangePassDto } from "../../dtos/settings.dto"

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Patch('/change-pass')
    changePass(@Body() body: ChangePassDto) {
        return this.settingsService.changePass(body.currentPass, body.newPass, body.userId)
    }

    @Post('/activate-email')
    sendMail(@Body() data: ActivateEmailDto) {
        return this.settingsService.sendMail(data.email, `${process.env.API_URL}/api/settings/activateEmail/${v4()}`, data.userId)
    }

    @Delete('/cancel-email-activation/:userId')
    cancelActivation(@Param('userId') userId: string) {
        return this.settingsService.cancelEmailActivation(userId)
    }

    @Get('/activate-email')
    async activate(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        await this.settingsService.activateEmail(`https://${req.get('host')}${req.originalUrl}`)
        res.redirect(`${process.env.CLIENT_URL}/settings/email`)
    }
}
