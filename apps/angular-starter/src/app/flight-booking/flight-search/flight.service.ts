import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '@flight-app/shared';
import { AbstractFlightService } from './abstract-flight.service';

@Injectable({ providedIn: 'root' })
export class FlightService implements AbstractFlightService {
  constructor(private http: HttpClient) {
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'api/flight';

    const params = new HttpParams()
      .set('from', from)
      .set('to', to);

    return this.http.get<Flight[]>(url, {params});
  }

  findById(id: string): Observable<Flight> {
    const url = 'api/flight/';
    return this.http.get<Flight>(url + id);
  }

  save(flight: Flight): Observable<Flight> {
    const url = 'api/flight';

    return this.http.put<Flight>(url, flight);
  }

}
