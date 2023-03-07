import { Args, Int, Query, Resolver } from '@nestjs/graphql'
// Service
import { UsersService } from "./users.service"
// Models
import { User } from "./models/user.model"
import { Users } from "./models/users.model"

@Resolver()
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(returns => User)
    getUser(@Args('id', { type: () => String}) id: string): Promise<User> {
        return this.usersService.getUser(id)
    }

    @Query(returns => Users)
    getUsers(@Args('id', { type: () => String}) id: string, @Args('skip', { type: () => Int}) skip: number): Promise<Users> {
        return this.usersService.getUsers(skip, id)
    }
}
