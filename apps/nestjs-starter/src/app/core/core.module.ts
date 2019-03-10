import { CacheModule, Global, HttpModule, Logger, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store';

const mongodbUri = 'mongodb://heroku_nhjc4749:3efp4l15pvjqmm4k0ud7klfb0i@ds263295.mlab.com:63295/heroku_nhjc4749';
const redisUri = 'redis://h:pc4badf0c4c341efc5f6d57fa204551cce79d7b54f0f9d9008a86ee6b40617e12@ec2-63-35-89-186.eu-west-1.compute.amazonaws.com:8289';

const loggerProvider: Provider = {provide: Logger, useFactory: () => new Logger('FlightServer')};

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      mongodbUri,
      {useNewUrlParser: true}
    ),
    CacheModule.register({
      ttl: 5,
      max: 10,
      store: redisStore,
      url: redisUri
    })
  ],
  providers: [loggerProvider],
  exports: [HttpModule, loggerProvider]
})
export class CoreModule {}
