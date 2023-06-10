import { v4 as uuidv4 } from "uuid"
import { diskStorage } from "multer"
// NestJS
import { BadRequestException, Body, Controller, Get, Param, Post, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from "@nestjs/platform-express"
// DTO
import { PasswordDto } from "@/settings/dto/password.dto"
import { MailDto } from "@/settings/dto/mail.dto"
import { TextDto } from "@/settings/dto/text.dto"
import { PhotoDto } from "@/settings/dto/photo.dto"
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

    @Put('name')
    async setName(@Body() data: TextDto) {
        const { text, userId } = data
        return this.settingsService.setName(text, userId)
    }

    @Put('location')
    async setLocation(@Body() data: TextDto) {
        const { text, userId } = data
        return this.settingsService.setLocation(text, userId)
    }

    @Post('avatar')
    @UseInterceptors(FilesInterceptor('image', null,
        {
            storage: diskStorage({
                destination: './uploads/avatars', filename: (req, file, callback) => {
                    callback(null, Date.now() + "--" + file.originalname)
                }
            })
        }))
    async setAvatar(@Body() data: PhotoDto, @UploadedFiles() file) {
        const { userId, currentPath } = data
        return this.settingsService.setAvatar(file[0].path, userId, currentPath)
    }

    @Post('banner')
    @UseInterceptors(FilesInterceptor('image', 100,
        {
            storage: diskStorage({
                destination: './uploads/banners', filename: (req, file, callback) => {
                    callback(null, Date.now() + "--" + file.originalname)
                }
            })
        }))
    async setBanner(@Body() data: PhotoDto, @UploadedFiles() file) {
        const { userId, currentPath } = data
        return this.settingsService.setBanner(file[0].path, userId, currentPath)
    }
}
