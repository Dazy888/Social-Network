import * as bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
// NestJS
import { BadRequestException, Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common'
// DTO
import { ChangePassDto } from "./dto/change-pass.dto"
import { SendMailDto } from "./dto/send-mail.dto"
// Service
import { SettingsService } from "./settings.service"
import MailService from "./mail"

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/password')
    async changePass(@Body() data: ChangePassDto) {
        const {pass, id} = data
        const response = await this.settingsService.changePass(await bcrypt.hash(pass, 3), id)

        if (typeof response === "string") throw new BadRequestException('Wrong password')
        return 'Ok'
    }

    @Post('/send-mail')
    async sendMail(@Body() data: SendMailDto) {
        const {email, id} = data
        const link = uuidv4()
        await MailService.sendActivationMail(email, `${process.env.API_URL}/settings/activate/${link}`)
        await this.settingsService.sendMail(email, link, id)
        return {isActivated: true, email}
    }

    @Get('/cancel-activation/:id')
    async cancelActivation(@Param('id') id: string) {
        await this.settingsService.cancelActivation(id)
        return 'Ok'
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res) {
        const response = await this.settingsService.activate(link)
        if (response) return response
        res.redirect(process.env.CLIENT_URL)
    }
}