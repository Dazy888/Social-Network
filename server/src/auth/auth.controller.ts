import { BadRequestException, Body, Controller, Post, Response, Request, Get } from '@nestjs/common'
// DTO
import { AuthorizationDto} from "./dto/authorization.dto"
// Service
import { AuthService} from "./auth.service"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async registration(@Body() user: AuthorizationDto, @Response({ passthrough: true }) res): Promise<any> {
        const { userLogin, password, /*token*/ } = user

        const response = await this.authService.registration(userLogin, password, /*token*/)
        if (typeof response === "string") throw new BadRequestException(response)

        res.cookie('refreshToken', response.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return response
    }

    @Post('login')
    async login(@Body() user: AuthorizationDto, @Response({ passthrough: true }) res) {
        const { userLogin, password, /*token*/ } = user

        const response = await this.authService.login(userLogin, password, /*token*/)
        if (typeof response === "string") throw new BadRequestException(response)

        res.cookie('refreshToken', response.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return response
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
        if (typeof response === "string") throw new BadRequestException(response)

        res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return response
    }
}