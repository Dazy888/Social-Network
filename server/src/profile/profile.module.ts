import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { ProfileController } from "./profile.controller"
import { ProfileService } from "./profile.service"
// Schemas
import { UserSchema } from "../schemas/user.schema"
import { PostSchema } from "../schemas/post.schema"

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }])],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {}
