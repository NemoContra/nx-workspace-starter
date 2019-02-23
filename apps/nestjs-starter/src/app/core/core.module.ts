import { Global, Logger, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from '@redis/client';
import { CacheModule } from '@nestjs/cache-manager';

const mongodbUri = 'mongodb://localhost:27017/nx-starter';
const redisUri = 'redis://localhost:6379';

const loggerProvider: Provider = {
  provide: Logger,
  useFactory: () => new Logger('FlightServer'),
};

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(mongodbUri),
    CacheModule.register<RedisClientOptions>({
      ttl: 5_000,
      max: 10,
      store: redisStore,
      url: redisUri,
    }),
  ],
  providers: [loggerProvider],
  exports: [HttpModule, CacheModule, loggerProvider],
})
export class CoreModule {}
