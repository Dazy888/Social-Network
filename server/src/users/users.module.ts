import { Module } from '@nestjs/common'
// Module
import { MongooseModule } from "@nestjs/mongoose"
// Service
import { UsersService } from '@/users/users.service'
// Controller
import { UsersController } from '@/users/users.controller'
// Schemas
import { UserSchema } from "@/schemas/user.schema"
import { PostSchema } from "@/schemas/post.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }])],
  providers: [UsersService],
  controllers: [UsersController]
})

export class UsersModule {}
