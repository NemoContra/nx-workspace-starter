import { CacheInterceptor, Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { Observable } from 'rxjs';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService, private readonly logger: Logger) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  public getPassengers(): Observable<string[]> {
    this.logger.log('Resolving passengers');
    return this.passengerService.getPassengers();
  }
}
