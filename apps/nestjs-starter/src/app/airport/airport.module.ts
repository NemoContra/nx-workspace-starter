import { Logger, Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';

@Module({
  controllers: [AirportController],
  providers: [
    AirportService,
    {provide: Logger, useFactory: () => new Logger('AirportModule')}
  ],
  exports: [AirportService]
})
export class AirportModule {}
