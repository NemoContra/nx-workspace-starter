import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
