// NestJS
import { Module } from '@nestjs/common'
// Controller
import { AppController } from './app.controller'
// Service
import { AppService } from './app.service'
// Modules
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://David:28032006@nodejs.rgylxul.mongodb.net/social-network?retryWrites=true&w=majority'), AuthModule, ProfileModule, SettingsModule],
  controllers: [AppController, ProfileController],
  providers: [AppService, ProfileService]
})
export class AppModule {}