import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
// Schemas
import { UserSchema } from "@/schemas/user.schema"
import { PostSchema } from "@/schemas/post.schema"
// Controller
import { ProfileController } from "@/profile/profile.controller"
// Service
import { ProfileService } from "@/profile/profile.service"

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Post', schema: PostSchema }]),],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {}
