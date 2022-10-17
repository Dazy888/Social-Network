// NestJS
import { Module } from '@nestjs/common'
import {MongooseModule} from "@nestjs/mongoose"
// Schemas
import {User, UserSchema} from "./schema/user.schema"
import {Tokens, TokensSchema} from "./schema/tokens.schema"
import {Posts, PostsSchema} from "./schema/posts.schema"
// Controllers
import {AuthController} from "./auth.controller"
// Services
import {AuthService} from "./auth.service"

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Tokens.name, schema: TokensSchema}, {name: Posts.name, schema: PostsSchema}])],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}