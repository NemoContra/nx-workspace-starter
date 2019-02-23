import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { Observable } from 'rxjs';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('passenger')
export class PassengerController {
  constructor(
    private readonly passengerService: PassengerService,
    private readonly logger: Logger
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  public getPassengers(): Observable<string[]> {
    this.logger.log('Resolving passengers');
    return this.passengerService.getPassengers();
  }
}
