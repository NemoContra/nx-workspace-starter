import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { DelayInterceptor } from '../interceptors/delay.interceptor';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FlightServer } from './flight-server.model';

@ApiTags('flights')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Returns HTTP-Status 401 if no Bearer token is provided'})
@Controller('flight')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggerInterceptor, DelayInterceptor)
export class FlightController {

  constructor(private readonly flightService: FlightService) { }

  @ApiQuery({name: 'from', type: String, description: 'Starting airport'})
  @ApiQuery({name: 'to', type: String, description: 'Destination airport'})
  @ApiQuery({name: 'fromDate', type: String, description: 'Departure time of the flight', required: false})
  @ApiQuery({name: 'toDate', type: String, description: 'Arrival time of the flight', required: false})
  @ApiOkResponse({description: 'Returns an array of flights depending on query params', isArray: true, type: FlightServer })
  @Get()
  getFlights(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string): Promise<FlightServer[]> {
    return this.flightService.searchFlights(from, to, fromDate, toDate);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string): Promise<FlightServer> {
    return this.flightService.getFlightById(+id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createFlight(@Body() flight: FlightServer): Promise<FlightServer> {
    return this.flightService.createFlight(flight);
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateFlight(@Body() flight: FlightServer): Promise<FlightServer> {
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
