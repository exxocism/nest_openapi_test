import * as fs from 'fs';
import * as yaml from 'yaml';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, documentOptions);
  const options = { customSiteTitle: 'Sample API Documentation' };
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  fs.writeFileSync('./openapi.yaml', yaml.stringify(document, {}));
  SwaggerModule.setup('api', app, document, options);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Allowed hosts might be restricted in production
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
