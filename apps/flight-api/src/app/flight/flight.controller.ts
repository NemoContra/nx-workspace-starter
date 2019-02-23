import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get(':id')
  getFlightById(@Param('id') id: string): Flight {
    const flight = this.flightService.getFlightById(+id);

    if (!flight) {
      throw new NotFoundException();
    }

    return flight;
  }
}
