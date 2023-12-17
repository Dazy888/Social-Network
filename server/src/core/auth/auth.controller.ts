import { Body, Controller, Post, Get, Param, UnauthorizedException, Delete } from '@nestjs/common'
import { AuthDto } from "./dtos/auth.dto"
import { AuthService} from "./auth.service"

export function checkToken(token: string) {
    if (!token) throw new UnauthorizedException('UserInfo is not authorized')
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registration(@Body() body: AuthDto) {
        return this.authService.registration(body.userName, body.pass)
    }

    @Post('login')
    async login(@Body() body: AuthDto) {
        return this.authService.login(body.userName, body.pass)
    }

    @Delete('logout/:refreshToken')
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
