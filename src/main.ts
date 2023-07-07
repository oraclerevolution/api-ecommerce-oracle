import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
