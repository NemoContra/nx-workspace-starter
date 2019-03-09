import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightService } from './flight.service';
import { Flight } from '@flight-app/shared';

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new FlightService(http),
  deps: [HttpClient]
})
export abstract class AbstractFlightService {
  abstract find(from: string, to: string): Observable<Flight[]>;

  abstract save(flight: Flight): Observable<Flight>;
}

