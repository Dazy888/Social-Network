import { Module } from '@nestjs/common'
// Schemas
import { User, UserSchema } from "./schemas/user.schema"
import { Tokens, TokensSchema } from "./schemas/tokens.schema"
import { Posts, PostsSchema } from "./schemas/posts.schema"
// Controllers
import { AuthController } from "./auth.controller"
// Services
import { AuthService } from "./auth.service"
// Module
import { MongooseModule } from "@nestjs/mongoose"
@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Tokens.name, schema: TokensSchema}, {name: Posts.name, schema: PostsSchema}])],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}