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
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DelayingInterceptor } from '../interceptors/delaying.interceptor';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { DatePipe } from '../pipes/date.pipe';

@Controller('flight')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggingInterceptor, DelayingInterceptor)
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Get()
  getFlights(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('fromDate', DatePipe) fromDate: Date,
    @Query('toDate', DatePipe) toDate: Date
  ): Flight[] {
    return this.flightService.getFlights(from, to, fromDate, toDate);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string): Flight {
    return this.flightService.getFlightById(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  createFlight(@Body() flight: Flight): Flight {
    return this.flightService.createFlight(flight);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFlightById(@Param('id') id: string): void {
    const deleted = this.flightService.deleteFlight(+id);
    if (!deleted) {
      throw new NotFoundException('Flight not found.');
    }
  }
}
