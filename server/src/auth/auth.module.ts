import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
// Schemas
import { UserSchema } from "@/schemas/user.schema"
import { TokenSchema } from "@/schemas/token.schema"
import { PostSchema } from "@/schemas/post.schema"
// Controllers
import { AuthController } from "@/auth/auth.controller"
// Services
import { AuthService } from "@/auth/auth.service"

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Token', schema: TokenSchema }, { name: 'Post', schema: PostSchema }])],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}
