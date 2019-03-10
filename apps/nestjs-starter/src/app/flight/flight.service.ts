import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDocument } from './flight.schema';
import { Model } from 'mongoose';
import { FlightServer } from './flight-server.model';

@Injectable()
export class FlightService {
  constructor(@InjectModel('Flight') private readonly flightModel: Model<FlightDocument>) {
  }

  public searchFlights(from: string, to: string, fromDate?: string, toDate?: string): Promise<FlightServer[]> {
    let query: any = { from, to };

    if (fromDate) {
      query = {...query, date: {...query.date, $gte: fromDate}}
    }
    if (toDate) {
      query = {...query, date: {...query.date, $lte: toDate}}
    }
    return this.flightModel.find(query).exec();
  }

  public async getFlightById(id: number): Promise<FlightServer> {
    const flight = await this.flightModel.findOne({id}).exec();
    if (flight) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async createFlight(flight: FlightServer): Promise<FlightServer> {
    const newFlight = new this.flightModel(flight);

    // Extracting only public values of the flight to omit internal properties from MongoDB like _id and __v
    const {id, from, to, date, delayed}: FlightServer = await newFlight.save();

    return {id, from, to, date, delayed};
  }

  public async updateFlight(flight: FlightServer): Promise<FlightServer> {
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
