import { Module } from '@nestjs/common'
// Service
import { UsersService } from './users.service'
// Resolver
import { UsersResolver } from './users.resolver'
// Module
import { MongooseModule } from "@nestjs/mongoose"
// Schemas
import { User, UserSchema } from "../auth/schemas/user.schema"
import { Posts, PostsSchema } from "../auth/schemas/posts.schema"

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Posts.name, schema: PostsSchema}])],
  providers: [UsersService, UsersResolver]
})

export class UsersModule {}
