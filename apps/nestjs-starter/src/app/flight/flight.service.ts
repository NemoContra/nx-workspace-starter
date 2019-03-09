import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDocument } from './flight.schema';
import { Model } from 'mongoose';

@Injectable()
export class FlightService {
  constructor(@InjectModel('Flight') private flightModel: Model<FlightDocument>) {
  }

  public searchFlights(from: string, to: string, fromDate?: string, toDate?: string): Promise<Flight[]> {
    let query: any = { from, to };

    if (fromDate) {
      query = {...query, date: {...query.date, $gte: fromDate}}
    }
    if (toDate) {
      query = {...query, date: {...query.date, $lte: toDate}}
    }
    return this.flightModel.find(query).exec();
  }

  public async getFlightById(id: number): Promise<Flight> {
    const flight = await this.flightModel.findOne({id}).exec();
    if (flight) {
      return flight;
    }
    throw new NotFoundException();
  }

  public createFlight(flight: Flight): Promise<Flight> {
    const newFlight = new this.flightModel(flight);
    return newFlight.save();
  }

  public async updateFlight(flight: Flight): Promise<Flight> {
    const result = await this.flightModel.updateOne({id: flight.id}, flight).exec();
    if (result.n === 1) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async deleteFlight(id: number): Promise<boolean> {
    const deleted = await this.flightModel.deleteOne({ id }).exec();
    return deleted.n === 1;
  }
}
