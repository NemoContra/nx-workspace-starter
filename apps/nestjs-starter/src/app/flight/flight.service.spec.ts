import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { of, throwError } from 'rxjs';
import { Flight } from '@flight-app/shared';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { getModelToken } from '@nestjs/mongoose';
import { FlightDao } from './flight.schema';

describe('FlightService', () => {
  let service: FlightService;
  let httpService: HttpService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        FlightService,
        {
          provide: getModelToken(FlightDao.name),
          useValue: MockFlightModel,
        },
      ],
    }).compile();
    service = module.get<FlightService>(FlightService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return an empty array if nothing is passed in "searchFlights"', async () => {
    expect(await service.getFlights('', '')).toEqual([]);
  });

  it('should return correct flights if "Stuttgart" and "Salzburg" is passed in "searchFlights"', async () => {
    const mockFlights: Flight[] = [
      {
        id: 171,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T09:07:54.1624336+00:00',
        delayed: false,
      },
      {
        id: 172,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T10:07:54.1624336+00:00',
        delayed: false,
      },
      {
        id: 173,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T11:07:54.1624336+00:00',
        delayed: false,
      },
    ];
    MockFlightModel.mockFlights = mockFlights;
    const result = await service.getFlights(
      'Stuttgart',
      'Salzburg',
      '2019-02-28T00:06:54',
      '2019-03-02T00:08:54'
    );
    expect(result.length).toEqual(3);
    expect(result).toEqual([
      {
        id: 171,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T09:07:54.1624336+00:00',
        delayed: false,
      },
      {
        id: 172,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T10:07:54.1624336+00:00',
        delayed: false,
      },
      {
        id: 173,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T11:07:54.1624336+00:00',
        delayed: false,
      },
    ]);
  });

  it('should return correct flight for "getFlightById"', () => {
    const mockData: Flight = {
      id: 4,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false,
    };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of({ data: mockData } as AxiosResponse<Flight>));

    service
      .getFlightById(4)
      .subscribe((data) => expect(data).toEqual(mockData));
    expect(httpService.get).toHaveBeenCalledWith(
      'http://www.angular.at/api/flight/4'
    );
  });

  it('should handle a HTTP-Error correctly for "getFlightById"', (done) => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => ({ response: { status: 400 } })));

    service.getFlightById(4).subscribe({
      next: () => fail,
      error: (error) => {
        expect(error.status).toEqual(400);
        done();
      },
    });
    expect(httpService.get).toHaveBeenCalledWith(
      'http://www.angular.at/api/flight/4'
    );
  });

  it('should return correct flight for "createFlight"', async () => {
    expect(
      await service.createFlight({
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      })
    ).toEqual({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false,
      _id: '5c82d9d5e8684023f23e9c4c',
    });
  });

  it('should return true for "deleteFlight"', async () => {
    MockFlightModel.deletedFlights = 1;
    expect(await service.deleteFlight(4)).toEqual(true);
  });

  it('should return false for "deleteFlight"', async () => {
    MockFlightModel.deletedFlights = 0;
    expect(await service.deleteFlight(190)).toEqual(false);
  });
});

class MockFlightModel {
  static mockFlights = [];
  static deletedFlights = 0;

  static find = () => {
    return { exec: () => Promise.resolve(MockFlightModel.mockFlights) };
  };

  static deleteOne = () => {
    return {
      exec: () =>
        Promise.resolve({ deletedCount: MockFlightModel.deletedFlights }),
    };
  };

  save() {
    return Promise.resolve({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false,
      _id: '5c82d9d5e8684023f23e9c4c',
    });
  }
}
