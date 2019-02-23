import { Injectable, NotFoundException } from '@nestjs/common';
import { Flight } from '@flight-app/shared';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDao } from './flight.schema';
import { Model, RootFilterQuery } from 'mongoose';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FlightDao.name) private flightModel: Model<FlightDao>
  ) {}

  public getFlights(
    from: string,
    to: string,
    fromDate?: string,
    toDate?: string
  ): Promise<Flight[]> {
    let query: RootFilterQuery<FlightDao> = { from, to };

    if (fromDate) {
      query = { ...query, date: { ...query.date, $gte: fromDate } };
    }
    if (toDate) {
      query = { ...query, date: { ...query.date, $lte: toDate } };
    }
    return this.flightModel.find(query).exec();
  }

  public async getFlightById(id: number): Promise<Flight> {
    const flight = await this.flightModel.findOne({ id }).exec();
    if (flight) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async createFlight(flight: Flight): Promise<Flight> {
    const newFlight = new this.flightModel(flight);

    // Extracting only public values of the flight to omit internal properties from MongoDB like _id and __v
    const { id, from, to, date, delayed }: Flight = await newFlight.save();

    return { id, from, to, date, delayed };
  }

  public async updateFlight(flight: Flight): Promise<Flight> {
    const result = await this.flightModel
      .updateOne({ id: flight.id }, flight)
      .exec();
    if (result.modifiedCount === 1) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async deleteFlight(id: number): Promise<boolean> {
    const deleted = await this.flightModel.deleteOne({ id }).exec();
    return deleted.deletedCount === 1;
  }
}
