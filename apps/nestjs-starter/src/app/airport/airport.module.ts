import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';

@Module({
  controllers: [AirportController],
  providers: [AirportService],
  exports: [AirportService]
})
export class AirportModule {}
