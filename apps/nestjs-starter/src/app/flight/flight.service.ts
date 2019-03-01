import { Injectable } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';

@Injectable()
export class FlightService {
  private flights: Flight[] = flights;

  public getFlights(from: string, to: string, fromDate?: Date, toDate?: Date): Flight[] {
    let filteredFlights = this.flights;
    if (fromDate) {
      filteredFlights = filteredFlights.filter(flight => new Date(flight.date) >= fromDate);
    }
    if (toDate) {
      filteredFlights = filteredFlights.filter(flight => new Date(flight.date) <= toDate);
    }
    return filteredFlights.filter(flight => flight.from === from && flight.to === to);
  }

  public getFlightById(id: number): Flight {
    return this.flights.find(flight => flight.id === id);
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
