import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Meter with Gemini - Documentation')
    .setDescription('See you meter value with a photo.')
    .setContact(
      'Vítor Oliveira. (@caulicons)',
      'https://github.com/caulicons',
      'caulicons.jobs@gmail.com',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());

  // Limit request size to 10MB
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
