import * as cookieParser from 'cookie-parser'
import * as cors from "cors"
import * as express from "express"
// NestJS
import { NestFactory } from '@nestjs/core'
// Module
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.use('/uploads', express.static('./uploads'))

  app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  }))

  await app.listen(5000)
}

bootstrap()