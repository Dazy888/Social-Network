import { v4 as uuidv4 } from "uuid"
// NestJS
import { BadRequestException, Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common'
// DTO
import { PasswordDto } from "@/dto/settings/password.dto"
import { MailDto } from "@/dto/settings/mail.dto"
// Services
import { SettingsService } from "@/settings/settings.service"
import MailService from "@/settings/mail"

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/password')
    async changePass(@Body() data: PasswordDto) {
        const { currentPass, newPass, userId } = data
        const response = await this.settingsService.changePass(currentPass, newPass, userId)
        if (response) throw new BadRequestException(response)
    }

    @Post('/mail')
    async sendMail(@Body() data: MailDto) {
        const { email, userId } = data
        const link = uuidv4()
        const response = await this.settingsService.sendMail(email, link, userId)

        if (response) {
            throw new BadRequestException(response)
        } else {
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/settings/activate/${link}`)
        }
    }

    @Get('/cancel-activation/:userId')
    async cancelActivation(@Param('userId') userId: string) {
        await this.settingsService.cancelActivation(userId)
    }

    @Get('/activate/:link')
    async activate(@Param('link') link: string, @Res({ passthrough: true }) res) {
        const response = await this.settingsService.activate(link)

        if (response) {
            throw new BadRequestException(response)
        } else {
            res.redirect(`${process.env.CLIENT_URL}/main/settings/activate`)
        }
    }
}
