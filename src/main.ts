import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'..','images'))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  // configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API e-commerce')
    .setDescription('vente de produit de tous type à caractère sexuel')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-ecommerce', app, document);
  const server = await app.listen(4300 || 4300);
}
bootstrap();
