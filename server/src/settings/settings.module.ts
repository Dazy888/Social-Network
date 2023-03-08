import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose"
// Controller
import { SettingsController } from '@/settings/settings.controller'
// Service
import { SettingsService } from '@/settings/settings.service'
// Schema
import { UserSchema } from "@/schemas/user.schema"

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [SettingsController],
  providers: [SettingsService]
})

export class SettingsModule {}
