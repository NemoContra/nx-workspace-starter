import { Injectable } from '@nestjs/common';
import { FlightService as FlightServiceV1 } from '../flight.service';
import { FlightServer } from './flight-server.model';
import { FlightServer as FlightServerV1 } from '../flight-server.model';

@Injectable()
export class FlightService {
  constructor(private readonly flightServiceV1: FlightServiceV1) {}

  public searchFlights(
    from: string,
    to: string,
    fromDate?: string,
    toDate?: string
  ): Promise<FlightServer[]> {
    return this.flightServiceV1
      .searchFlights(from, to, fromDate, toDate)
      .then((flights) => flights.map(this.addVersion));
  }

  public async getFlightById(id: number): Promise<FlightServer> {
    return this.flightServiceV1.getFlightById(id).then(this.addVersion);
  }

  public async createFlight(flight: FlightServerV1): Promise<FlightServer> {
    return this.flightServiceV1.createFlight(flight).then(this.addVersion);
  }

  public async updateFlight(flight: FlightServerV1): Promise<FlightServer> {
    return this.flightServiceV1.updateFlight(flight).then(this.addVersion);
  }

  public async deleteFlight(id: number): Promise<boolean> {
    return this.flightServiceV1.deleteFlight(id);
  }

  private addVersion(flight: FlightServerV1): FlightServer {
    return { ...flight, version: 2 };
  }
}
