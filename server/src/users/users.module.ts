// NestJS
import { Module } from '@nestjs/common'
// Controller
import { UsersController } from './users.controller'
// Service
import { UsersService } from './users.service'
// Module
import { MongooseModule } from "@nestjs/mongoose"
// Schema
import { User, UserSchema } from "../auth/schema/user.schema"

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
