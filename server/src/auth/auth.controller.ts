import { Body, Controller, Post, Get, Param, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from "../dto/auth/auth.dto"
import { AuthService} from "./auth.service"

export function checkToken(token: string) {
    if (!token) throw new UnauthorizedException('User is not authorized')
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async registration(@Body() user: AuthDto) {
        const { login, password } = user
        return this.authService.registration(login, password)
    }

    @Post('login')
    async login(@Body() user: AuthDto) {
        const { login, password } = user
        return this.authService.login(login, password)
    }

    @Get('logout/:refreshToken')
    async logout(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.logout(refreshToken)
    }

    @Get('refresh/refreshToken')
    async refresh(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.refresh(refreshToken)
    }
}
