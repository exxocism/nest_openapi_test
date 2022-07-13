import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Generate_OpenAPI } from './openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Allowed hosts might be restricted in production
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

if (process.env.GENERATE_OPENAPI) Generate_OpenAPI();
else bootstrap();
