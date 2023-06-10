import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from "./users.service"
import { checkAccessToken } from "../profile/profile.controller"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:skip/:id/:accessToken')
    getUsers(@Param('skip') skip: string, @Param('id') id: string, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.usersService.getUsers(Number(skip), id)
    }

    @Get('/:id/:accessToken')
    getUser(@Param('id') id: string, @Param('accessToken') accessToken: string) {
        checkAccessToken(accessToken)
        return this.usersService.getUser(id)
    }
}
