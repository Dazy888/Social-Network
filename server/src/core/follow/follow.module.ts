import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { FollowController } from "./follow.controller"
import { FollowService } from "./follow.service"
// Schemas
import { FollowSchema } from "../../schemas/follow.schema"
// Middlewares
import { AuthMiddleware } from "../middlewares/auth.middleware"

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: 'Follow',
            schema: FollowSchema
        }
    ])],
    controllers: [FollowController],
    providers: [FollowService]
})
export class FollowModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(FollowController)
    }
}
