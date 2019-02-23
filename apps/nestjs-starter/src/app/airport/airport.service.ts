import { ClientProxy } from '@nestjs/microservices';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AirportService {
  constructor(@Inject('CLIENT') private client: ClientProxy) {}

  public getAirports(): Observable<string[]> {
    return from(this.client.connect()).pipe(
      switchMap(() =>
        this.client.send<string[]>({ cmd: 'airports' }, 'airports')
      ),
      catchError(() => throwError(() => new UnauthorizedException()))
    );
  }
}
