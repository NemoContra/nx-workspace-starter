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
  UseInterceptors,
  UsePipes,
  ValidationPipe, Put
} from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DelayInterceptor } from '../interceptors/delay.interceptor';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
import { Observable } from 'rxjs';

@Controller('flight')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggerInterceptor, DelayInterceptor)
export class FlightController {

  constructor(private flightService: FlightService) {
  }

  @Get()
  getFlights(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string): Promise<Flight[]> {
    return this.flightService.searchFlights(from, to, fromDate, toDate);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string): Promise<Flight> {
    return this.flightService.getFlightById(+id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createFlight(@Body() flight: Flight): Promise<Flight> {
    return this.flightService.createFlight(flight);
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateFlight(@Body() flight: Flight): Promise<Flight> {
    return this.flightService.updateFlight(flight);
  }

  @Delete(':id')
  async deleteFlightById(@Param('id') id: string): Promise<void> {
    const deleted = await this.flightService.deleteFlight(+id);
    if (!deleted) {
      throw new NotFoundException('Flight not found.');
    }
  }
}
