import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class FlightService {
  private flights: Flight[] = flights;

  constructor(private httpService: HttpService) {
  }

  public searchFlights(from: string, to: string, fromDate?: Date, toDate?: Date): Flight[] {
    let filteredFlights = this.flights;
    if (fromDate) {
      filteredFlights = filteredFlights.filter(flight => new Date(flight.date) >= fromDate);
    }
    if (toDate) {
      filteredFlights = filteredFlights.filter(flight => new Date(flight.date) <= toDate);
    }
    return filteredFlights.filter(flight => flight.from === from && flight.to === to);
  }

  public getFlightById(id: number): Observable<Flight> {
    return this.httpService.get<Flight>(`http://www.angular.at/api/flight/${id}`)
      .pipe(
        map(res => res.data),
        catchError((error: AxiosError) => throwError(new HttpException('', error.response.status)))
      );
  }

  public createFlight(flight: Flight): Flight {
    const newFlight: Flight = {
      ...flight,
      id: this.flights.length + 1
    };
    this.flights = [
      ...this.flights,
      newFlight
    ];
    return newFlight;
  }

  public deleteFlight(id: number): boolean {
    const length = this.flights.length;
    this.flights = this.flights.filter(flight => flight.id !== +id);
    return length !== this.flights.length
  }
}
