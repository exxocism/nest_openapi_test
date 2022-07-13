import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function Generate_OpenAPI(): Promise<void> {
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
  fs.writeFileSync('./postman/schemas/openapi.json', JSON.stringify(document, null, 2));
  // fs.writeFileSync('./openapi.yaml', yaml.stringify(document, {}));
  SwaggerModule.setup('api', app, document, options);

  console.log(`OpenAPI generated`);
  await app.close();
}
