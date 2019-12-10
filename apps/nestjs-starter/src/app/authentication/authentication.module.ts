import { Global, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpStrategy } from './http.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { redisUri } from '../core/core.module';
import { RedisService } from '../redis/redis.service';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret',
      signOptions: {
        expiresIn: '60s'
      }
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule.register([
      { name: 'REDIS', transport: Transport.REDIS, options: { url: redisUri, retryAttempts: 5, retryDelay: 3000 } }
    ]),
    UserModule
  ],
  providers: [AuthenticationService, HttpStrategy, RedisService],
  exports: [AuthenticationService, PassportModule],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {
}
