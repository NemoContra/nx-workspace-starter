import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightService } from './flight.service';
import type { Flight } from '@flight-app/shared';

@Injectable({
  providedIn: 'root',
  useClass: FlightService,
})
export abstract class AbstractFlightService {
  abstract find(from: string, to: string): Observable<Flight[]>;

  abstract save(flight: Flight): Observable<Flight>;
}
