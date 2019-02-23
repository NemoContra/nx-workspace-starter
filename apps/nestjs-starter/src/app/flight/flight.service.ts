import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Flight } from '@flight-app/shared';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDao } from './flight.schema';
import { Model, RootFilterQuery } from 'mongoose';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FlightDao.name) private flightModel: Model<FlightDao>,
    private httpService: HttpService
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

  public getFlightById(id: number): Observable<Flight> {
    return this.httpService
      .get<Flight>(`http://www.angular.at/api/flight/${id}`)
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) =>
          throwError(() => new HttpException('', error.response.status))
        )
      );
  }

  public createFlight(flight: Flight): Promise<Flight> {
    const newFlight = new this.flightModel(flight);
    return newFlight.save();
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
