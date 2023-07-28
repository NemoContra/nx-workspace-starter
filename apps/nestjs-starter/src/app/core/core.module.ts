import { CacheModule, Global, Logger, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import { ClientOpts } from 'redis';

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
    MongooseModule.forRoot(mongodbUri, { useNewUrlParser: true }),
    CacheModule.register<ClientOpts>({
      ttl: 5,
      max: 10,
      store: redisStore,
      url: redisUri,
    }),
  ],
  providers: [loggerProvider],
  exports: [HttpModule, CacheModule, loggerProvider],
})
export class CoreModule {}
