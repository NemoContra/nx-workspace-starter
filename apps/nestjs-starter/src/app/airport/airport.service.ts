import { Injectable } from '@angular/core';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

@Injectable()
export class AirportService {
  @Client({
    transport: Transport.TCP,
    options: {
      port: 4000
    }
  })
  private client: ClientProxy;

  public getAirports(): Observable<string[]> {
    return from(this.client.connect()).pipe(
      switchMapTo(this.client.send<string[]>({cmd: 'airports'}, 'airports'))
    )
  }
}
