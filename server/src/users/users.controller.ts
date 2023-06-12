import {Controller, Get, Headers, Param} from '@nestjs/common'
import { UsersService } from "./users.service"
import { checkAccessToken } from "../profile/profile.controller"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:skip/:id')
    getUsers(@Param('skip') skip: string, @Param('id') id: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.usersService.getUsers(Number(skip), id)
    }

    @Get('/:id')
    getUser(@Param('id') id: string, @Headers('authorization') authorization: string) {
        const accessToken = authorization.split(' ')[1]
        checkAccessToken(accessToken)
        return this.usersService.getUser(id)
    }
}
