import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const port = 4000;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port,
    },
  });
  await app.listen();
  // app.get(ConsoleLogger).log(`Microservice is listening on port ${port}`);
}

bootstrap();
