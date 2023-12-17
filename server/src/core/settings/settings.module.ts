import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'
import { UserSchema } from "../schemas/user.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [SettingsController],
  providers: [SettingsService]
})

export class SettingsModule {}
