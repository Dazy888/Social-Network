import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'
import { UserSchema } from "../../schemas/user.schema"
import { AuthMiddleware } from "../middlewares/auth.middleware"
import { ProfileController } from "../profile/profile.controller"

@Module({
  imports: [
      MongooseModule.forFeature([
          {
            name: 'User',
            schema: UserSchema
          }
      ])
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProfileController)
  }
}
