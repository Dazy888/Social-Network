import { Module } from '@nestjs/common'
// Controller
import { SettingsController } from './settings.controller'
// Service
import { SettingsService } from './settings.service'
// Schema
import { User, UserSchema } from "../auth/schema/user.schema"
// Module
import { MongooseModule } from "@nestjs/mongoose"
@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [SettingsController],
  providers: [SettingsService]
})

export class SettingsModule {}
