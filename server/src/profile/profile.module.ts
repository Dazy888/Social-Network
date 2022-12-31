import { Module } from '@nestjs/common'
// Schemas
import { User, UserSchema } from "../auth/schema/user.schema"
import { Posts, PostsSchema } from "../auth/schema/posts.schema"
// Controller
import { ProfileController } from "./profile.controller"
// Service
import { ProfileService } from "./profile.service"
// Module
import { MongooseModule } from "@nestjs/mongoose"
@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Posts.name, schema: PostsSchema}]),],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule {}
