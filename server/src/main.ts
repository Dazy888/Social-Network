import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as cors from "cors"
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  }))
  app.use('/uploads', express.static('./uploads'))
  app.setGlobalPrefix('api')
  await app.listen(5000)
}

bootstrap()