import {Body, Controller, Post} from '@nestjs/common'
import {RegistrationDto} from "./dto/registration.dto"
import {AuthService} from "./auth.service"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/registration')
    async registration(@Body() user: RegistrationDto) {
        const {login, password, token} = user
        return this.authService.registration(login, password, token)
    }

    // async registration(req, res, next) {
    //     try {
    //         const {userLogin, password, token} = req.body
    //         await AuthService.humanValidation(res, token)
    //         if (await UserModel.findOne({userLogin})) ServerErrors.BadRequest(res, 'User with this login already exists')
    //
    //         const userData = await AuthService.registration(userLogin, password)
    //         res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    //         res.json(userData)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
}
