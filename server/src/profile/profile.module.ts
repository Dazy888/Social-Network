import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { ProfileController } from "./profile.controller"
import { ProfileService } from "./profile.service"
// Schemas
import { UserSchema } from "../schemas/user.schema"
import { PostSchema } from "../schemas/post.schema"
import { ProfileSchema } from "../schemas/profile.schema"
import { SubscriptionsSchema } from "../schemas/subscriptions.schema"

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema }, { name: 'Profile', schema: ProfileSchema },
        { name: 'Post', schema: PostSchema }, { name: 'Subscriptions', schema: SubscriptionsSchema }
    ])],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {}
