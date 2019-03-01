import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DelayInterceptor } from '../interceptors/delay.interceptor';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';

@Controller('flight')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggerInterceptor, DelayInterceptor)
export class FlightController {

    constructor(private flightService: FlightService) {
    }

    @Get()
    getFlights(@Query('from') from: string, @Query('to') to: string): Flight[] {
        return this.flightService.getFlights(from, to);
    }

    @Get(':id')
    getFlightById(@Param('id') id: string): Flight {
      return this.flightService.getFlightById(+id);
    }

    @Post()
    @HttpCode(201)
    createFlight(@Body() flight: Flight): Flight {
      return this.flightService.createFlight(flight);
    }

    @Delete(':id')
    deleteFlightById(@Param('id') id: string): void {
      const deleted = this.flightService.deleteFlight(+id);
      if (!deleted) {
        throw new NotFoundException('Flight not found.');
      }
    }
}
