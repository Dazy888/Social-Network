import { Body, Controller, Post, Get, Param, UnauthorizedException, Delete, Patch } from '@nestjs/common'
import { AuthDto, GoogleSignInDTO, RecoverPassDTO, SetNewPassDTO } from "../../dtos/auth.dto"
import { AuthService} from "./auth.service"
import { OAuth2Client } from "google-auth-library"

export function checkToken(token: string) {
    if (!token) throw new UnauthorizedException('User is not authorized')
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

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

    @Post('google/sign-in')
    async googleSignIn(@Body() body: GoogleSignInDTO) {
        const ticket = await client.verifyIdToken({
            idToken: body.credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        return this.authService.googleSignIn(payload)
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
