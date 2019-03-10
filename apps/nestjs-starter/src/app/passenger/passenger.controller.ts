import { CacheInterceptor, Controller, Get, Logger, UseInterceptors } from '@nestjs/common';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly logger: Logger) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  public getPassengers(): string[] {
    this.logger.log('Resolving passengers');
    return [
      'Max Mustermann',
      'Pablo Lellinger',
      'Paul Palme',
      'Fridolin Flieger'
    ];
  }
}
