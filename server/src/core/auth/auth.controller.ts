import {Body, Controller, Post, Get, Param, UnauthorizedException, Delete, Res, Req, Patch} from '@nestjs/common'
import {AuthDto, RecoverPassDTO, SetNewPassDTO} from "../../dtos/auth.dto"
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

    @Patch('set-new-pass')
    async passRecovering(@Body() body: SetNewPassDTO) {
        await this.authService.changePass(body.recoveryLink, body.newPass)
    }
}
