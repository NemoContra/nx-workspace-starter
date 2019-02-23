/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AppModule } from './app/app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(AppModule);
}

bootstrap();
