import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from "./users.service"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/:skip/:id')
    getUsers(@Param('skip') skip: string, @Param('id') id: string) {
        return this.usersService.getUsers(Number(skip), id)
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id)
    }
}
