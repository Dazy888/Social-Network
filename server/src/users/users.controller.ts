// NestJS
import { Controller, Get } from '@nestjs/common'
// Service
import { UsersService } from "./users.service"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return this.usersService.getUsers()
    }
}
