import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
// Schemas
import { UserSchema } from "../../schemas/user.schema"
import { PostSchema } from "../../schemas/post.schema"
import { ProfileSchema } from "../../schemas/profile.schema"
import { SubscriptionSchema } from "../../schemas/subscription.schema"

@Module({
  imports: [MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }, { name: 'Profile', schema: ProfileSchema }, { name: 'Post', schema: PostSchema },
      { name: 'Subscriptions', schema: SubscriptionSchema }
  ])],
  providers: [UsersService],
  controllers: [UsersController]
})

export class UsersModule {}
