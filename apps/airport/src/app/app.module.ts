import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: Logger, useFactory: () => new Logger('Airport Microservice') },
    AppService,
  ],
})
export class AppModule {}
