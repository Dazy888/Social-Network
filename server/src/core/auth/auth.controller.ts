import {Body, Controller, Post, Get, Param, UnauthorizedException, Delete, Res, Req} from '@nestjs/common'
import {AuthDto, RecoverPassDTO} from "../../dtos/auth.dto"
import { AuthService} from "./auth.service"
import {Request, Response} from "express";

export function checkToken(token: string) {
    if (!token) throw new UnauthorizedException('User is not authorized')
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() body: AuthDto) {
        return this.authService.signUp(body.username, body.pass)
    }

    @Post('sign-in')
    signIn(@Body() body: AuthDto) {
        return this.authService.signIn(body.username, body.pass)
    }

    @Delete('sign-out/:refreshToken')
    signOut(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.signOut(refreshToken)
    }

    @Get('refresh/:refreshToken')
    refresh(@Param('refreshToken') refreshToken: string) {
        checkToken(refreshToken)
        return this.authService.refresh(refreshToken)
    }

    @Post('recover-pass')
    recoverPass(@Body() body: RecoverPassDTO) {
        return this.authService.recoverPass(body.email)
    }

    @Get('/pass-recovering')
    async passRecovering(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        await this.authService.passRecovering(`https://${req.get('host')}${req.originalUrl}`)
        res.redirect(`${process.env.CLIENT_URL}/auth/new-pass`)
    }
}
