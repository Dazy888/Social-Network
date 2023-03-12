import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// Controller
import { AppController } from '@/app.controller'
// Service
import { AppService } from '@/app.service'
// Modules
import { AuthModule } from '@/auth/auth.module'
import { ProfileModule } from '@/profile/profile.module'
import { SettingsModule } from '@/settings/settings.module'
import { UsersModule } from "@/users/users.module"

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://David:28032006@nodejs.rgylxul.mongodb.net/social-network?retryWrites=true&w=majority'),
      AuthModule, ProfileModule, SettingsModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
