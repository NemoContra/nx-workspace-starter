import { Injectable } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import flights from '../../../mock-data/flights.json';

@Injectable()
export class FlightService {
  private flights = flights;

  public getFlightById(id: number): Flight | undefined {
    return this.flights.find((flight) => flight.id === id);
  }
}
