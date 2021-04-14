/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Command } from 'commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });

  const command = new Command('log');
  command.alias('l').option('-t --test <value>').action((input) => {
    console.log('Log', input);
  });

  command.parse(process.argv);

  await app.close();
}

bootstrap();
