import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MailerModule } from "@nestjs-modules/mailer"
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller'
import { AppService } from './app.service'
// Modules
import { AuthModule } from 'authModule'
import { ProfileModule } from './core/profile/profile.module'
import { SettingsModule } from './core/settings/settings.module'
import { UsersModule } from "./core/users/users.module"

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      AuthModule,
      ProfileModule,
      SettingsModule,
      UsersModule,
      MongooseModule.forRoot(process.env.DB_URL),
      MailerModule.forRoot(
          {
              transport: {
                  host: process.env.SMTP_HOST,
                  port: process.env.SMTP_PORT,
                  auth: {
                      user: process.env.SMTP_USER,
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
