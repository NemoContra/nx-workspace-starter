import { Logger, Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
  controllers: [FlightController],
  providers: [FlightService, Logger, {provide: 'DELAY_TIME', useValue: 2000}]
})
export class FlightModule {}
