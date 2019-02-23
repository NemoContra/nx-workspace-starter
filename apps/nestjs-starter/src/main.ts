/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Flights example')
    .setDescription('The flight API description')
    .setVersion('1.0')
    .addTag('flights')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  await app.listen(3333, () => {
    app.get(Logger).log('Listening at http://localhost:3333');
  });
}

bootstrap();
