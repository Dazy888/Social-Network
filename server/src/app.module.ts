import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MailerModule } from "@nestjs-modules/mailer"
import { AppController } from './app.controller'
import { AppService } from './app.service'
// Modules
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from './profile/profile.module'
import { SettingsModule } from './settings/settings.module'
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
      // mongodb+srv://davidhutsenko:<password>@free-cluster.alelksu.mongodb.net/
      MongooseModule.forRoot('mongodb+srv://David:28032006@nodejs.rgylxul.mongodb.net/social-network?retryWrites=true&w=majority'),
      // MongooseModule.forRoot('mongodb+srv://davidhutsenko:Bs3tjB0tZnSesLw5@free-cluster.alelksu.mongodb.net/social-network?retryWrites=true&w=majority'),
      AuthModule, ProfileModule, SettingsModule, UsersModule,
      MailerModule.forRoot(
          {
              transport: {
                  host: process.env.SMTP_HOST,
                  port: 465,
                  auth: {
                      user: process.env.SMTP_EMAIL,
                      pass: process.env.SMTP_PASSWORD
                  }
              }
          }
      )
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
