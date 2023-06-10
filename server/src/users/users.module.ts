import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
// Schemas
import { UserSchema } from "../schemas/user.schema"
import { PostSchema } from "../schemas/post.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }])],
  providers: [UsersService],
  controllers: [UsersController]
})

export class UsersModule {}
