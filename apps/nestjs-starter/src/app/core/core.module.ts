import { CacheModule, Global, HttpModule, Logger, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from '../../environments/environment';

const mongodbUri = '';
const redisUri = '';

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
    }),
    GraphQLModule.forRoot({
      debug: !environment.production,
      playground: !environment.production,
      autoSchemaFile: 'schema.gql'
    })
  ],
  providers: [loggerProvider],
  exports: [HttpModule, CacheModule, loggerProvider]
})
export class CoreModule {}
