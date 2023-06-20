import * as dotenv from "dotenv"
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: ['https://social-network-dazy888.vercel.app', 'http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })

  await app.listen(process.env.PORT || 5000)
}

bootstrap()
