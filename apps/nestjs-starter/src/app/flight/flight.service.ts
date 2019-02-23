import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Flight } from '@flight-app/shared';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { FlightEntity } from './flight.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
    private httpService: HttpService
  ) {}

  public getFlights(
    from: string,
    to: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<FlightEntity[]> {
    const query = this.flightRepository
      .createQueryBuilder()
      .select('flight_entity')
      .from(FlightEntity, 'flight_entity')
      .where({ from, to });
    if (fromDate) {
      query.andWhere('flight_entity.date >= :fromDate', { fromDate });
    }
    if (toDate) {
      query.andWhere('flight_entity.date <= :toDate', { toDate });
    }
    return query.getMany();
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

  public createFlight(flight: Flight): Promise<FlightEntity> {
    const newFlight = new FlightEntity();
    newFlight.from = flight.from;
    newFlight.to = flight.to;
    newFlight.date = flight.date;
    newFlight.delayed = flight.delayed;
    return this.flightRepository.save(newFlight);
  }

  public async updateFlight(flight: Flight): Promise<Flight> {
    const result: UpdateResult = await this.flightRepository.update(
      { id: flight.id },
      flight
    );
    console.log(result);
    if (result.affected === 1) {
      return flight;
    }
    throw new NotFoundException();
  }

  public async deleteFlight(id: number): Promise<boolean> {
    return !!(await this.flightRepository.delete({ id })).affected;
  }
}
