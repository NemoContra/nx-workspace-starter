import { Injectable, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) { }

  public getAirports(): Observable<string[]> {
    this.logger.log('Resolving Airports');
    return of([
      'Flughafen Wien-Schwechat',
      'Flughafen Manfred Rommel Stuttgart',
      'Flughafen Helmut Schmidt Hamburg'
    ]).pipe(delay(2000));
  }
}
