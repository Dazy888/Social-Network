import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { ProfileController } from "./profile.controller"
import { ProfileService } from "./profile.service"
// Schemas
import { PostSchema } from "../../schemas/post.schema"
import { ProfileSchema } from "../../schemas/profile.schema"
// Middlewares
import { AuthMiddleware } from "../middlewares/auth.middleware"

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Profile',
            schema: ProfileSchema
        },
        {
            name: 'Post',
            schema: PostSchema
        }
    ])],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(ProfileController)
    }
}
