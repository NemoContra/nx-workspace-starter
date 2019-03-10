import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) { }

  public getAirports(): string[] {
    this.logger.log('Resolving Airports');
    return [
      'Flughafen Wien-Schwechat',
      'Flughafen Manfred Rommel Stuttgart',
      'Flughafen Helmut Schmidt Hamburg'
    ];
  }
}
