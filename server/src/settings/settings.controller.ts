import { v4 as uuidv4 } from "uuid"
// NestJS
import { BadRequestException, Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common'
// DTO
import { ChangePassDto } from "@/dto/changePass.dto"
import { SendMailDto } from "@/dto/sendMail.dto"
// Services
import { SettingsService } from "@/settings/settings.service"
import MailService from "@/settings/mail"

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Put('/password')
    async changePass(@Body() data: ChangePassDto) {
        const { pass, id, newPass } = data
        const response = await this.settingsService.changePass(pass, id, newPass)
        if (response) throw new BadRequestException(response)
    }

    @Post('/mail')
    async sendMail(@Body() data: SendMailDto) {
        const { email, id } = data
        const link = uuidv4()
        const response = await this.settingsService.sendMail(email, link, id)

        if (response) {
            throw new BadRequestException(response)
        } else {
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/settings/activate/${link}`)
        }
    }

    @Get('/cancel-activation/:id')
    async cancelActivation(@Param('id') id: string) {
        await this.settingsService.cancelActivation(id)
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
