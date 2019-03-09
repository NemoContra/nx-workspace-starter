import { Injectable } from '@angular/core';
import { ClientProxy } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';
import { Inject } from '@nestjs/common';

@Injectable()
export class AirportService {

  constructor(@Inject('CLIENT') private client: ClientProxy) {
  }

  public getAirports(): Observable<string[]> {
    return from(this.client.connect()).pipe(
      switchMapTo(this.client.send<string[]>({cmd: 'airports'}, 'airports'))
    )
  }
}
