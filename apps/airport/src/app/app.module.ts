import { CacheModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 10
    })
  ],
  controllers: [AppController],
  providers: [
    {provide: Logger, useFactory: () => new Logger('Airport Microservice')},
    AppService
  ],
})
export class AppModule {}
