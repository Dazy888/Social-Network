import { join } from 'path'
// NestJS
import { Module } from '@nestjs/common'
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
// Controller
import { AppController } from './app.controller'
// Service
import { AppService } from './app.service'
// Modules
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { ProfileModule } from './profile/profile.module'
import { SettingsModule } from './settings/settings.module'
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://David:28032006@nodejs.rgylxul.mongodb.net/social-network?retryWrites=true&w=majority'),
      AuthModule,
      ProfileModule,
      SettingsModule,
      UsersModule,
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'src/static'),
          renderPath: '/api'
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql')
      }),
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
