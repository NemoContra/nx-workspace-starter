import { Global, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Global()
@Module({
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
