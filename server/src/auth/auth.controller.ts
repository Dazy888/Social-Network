import { Body, Controller, Post, Get, Param, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from "./dto/auth.dto"
import { AuthService} from "./auth.service"

export function checkToken(token: string) {
    if (!token) throw new UnauthorizedException('UserInfo is not authorized')
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('registration')
    async registration(@Body() user: AuthDto) {
        return this.authService.registration(user.login, user.pass)
    }

    @Post('login')
    async login(@Body() user: AuthDto) {
        return this.authService.login(user.login, user.pass)
    }

    @Get('logout/:refreshToken')
    async logout(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.logout(refreshToken)
    }

    @Get('refresh/:refreshToken')
    async refresh(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.refresh(refreshToken)
    }
}
