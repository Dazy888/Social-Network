import { Module } from '@nestjs/common'
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema/user.schema"
import {AuthController} from "./auth.controller"
import {AuthService} from "./auth.service"
import {Tokens, TokensSchema} from "../products/schemas/tokens.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Tokens.name, schema: TokensSchema}])],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}