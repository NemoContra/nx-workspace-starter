import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '@flight-app/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private http = inject(HttpClient);

  find(from?: string, to?: string): Observable<Flight[]> {
    const url = 'https://demo.angulararchitects.io/api/flight';

    const headers = {
      Accept: 'application/json',
    };

    const params = {
      from: from || '',
      to: to || '',
    };

    return this.http.get<Flight[]>(url, { headers, params });
  }
}
