import { BadRequestException, Body, Controller, Post, Response, Request, Get } from '@nestjs/common'
import { AuthDto } from "@/dto/auth/auth.dto"
import { AuthService} from "@/auth/auth.service"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async registration(@Body() user: AuthDto, @Response({ passthrough: true }) res) {
        const { login, password, /*token*/ } = user
        const response = await this.authService.registration(login, password, /*token*/)

        if (typeof response === "string") {
            throw new BadRequestException(response)
        } else {
            res.cookie('refreshToken', response.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return response
        }
    }

    @Post('login')
    async login(@Body() user: AuthDto, @Response({ passthrough: true }) res) {
        const { login, password, /*token*/ } = user
        const response = await this.authService.login(login, password, /*token*/)

        if (typeof response === "string") {
            throw new BadRequestException(response)
        } else {
            res.cookie('refreshToken', response.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return response
        }
    }

    @Get('logout')
    async logout(@Request() req, @Response({ passthrough: true }) res) {
        const { refreshToken } = req.cookies
        res.clearCookie('refreshToken')
        return this.authService.logout(refreshToken)
    }

    @Get('refresh')
    async refresh(@Request() req, @Response({ passthrough: true }) res) {
        const { refreshToken } = req.cookies
        const response = await this.authService.refresh(refreshToken)

        if (typeof response === "string") {
            throw new BadRequestException(response)
        } else {
            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return response
        }
    }
}
