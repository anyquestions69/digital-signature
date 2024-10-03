import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	// Настройка CORS
	const corsOptions = {
		origin: process.env.CORS_ORIGIN || '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	}

	app.enableCors(corsOptions)
	await app.listen(3000)
}

bootstrap()
