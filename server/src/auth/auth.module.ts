import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
// Schemas
import { UserSchema } from "../schemas/user.schema"
import { TokenSchema } from "../schemas/token.schema"
import { PostSchema } from "../schemas/post.schema"
import { ProfileSchema } from "../schemas/profile.schema"

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema }, { name: 'Profile', schema: ProfileSchema },
        { name: 'Token', schema: TokenSchema }, { name: 'Post', schema: PostSchema }
    ])],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {}
