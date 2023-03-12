import * as cookieParser from 'cookie-parser'
import * as express from "express"
import * as process from "process"
// NestJS
import { NestFactory } from '@nestjs/core'
// Module
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')

  app.use(cookieParser())
  app.use('/uploads', express.static('./uploads'))
  app.use('/', express.static('./public'))

  app.enableCors({
    origin: [
      'https://social-network-api-alpha.vercel.app',
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })

  await app.listen(process.env.PORT || 5000)
}

bootstrap()
