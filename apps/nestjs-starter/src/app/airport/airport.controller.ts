import { Controller, Get } from '@nestjs/common';
import { AirportService } from './airport.service';
import { Observable } from 'rxjs';

@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) { }

  @Get()
  public getAirports(): Observable<string[]> {
    return this.airportService.getAirports();
  }
}
