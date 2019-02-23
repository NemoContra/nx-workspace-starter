import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [
    { provide: Logger, useFactory: () => new Logger('Airport Microservice') },
  ],
})
export class AppModule {}
