import { Logger, Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    { provide: Logger, useFactory: () => new Logger('HealthModule') },
  ],
})
export class HealthModule {}
