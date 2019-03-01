import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightService]
    }).compile();
    service = module.get<FlightService>(FlightService);
  });

  it('should return an empty array if nothing is passed in "searchFlights"', () => {
    expect(service.getFlights('', '')).toEqual([]);
  });

  it('should return correct flights if "Hamburg" and "Graz" is passed in "searchFlights"', () => {
    expect(service.getFlights('Hamburg', 'Graz')).toEqual([
      {
        id: 3,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T07:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 4,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 5,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T12:07:54.1624336+00:00',
        delayed: false
      }
    ]);
  });

  it('should return correct flight for "getFlightById"', () => {
    expect(service.getFlightById(4)).toEqual({
      id: 4,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    });
  });

  it('should return correct flight for "createFlight"', () => {
    expect(service.createFlight({
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    })).toEqual({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    });
  });

  it('should return correct flight for "createFlight"', () => {
    expect(service.createFlight({
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    })).toEqual({
      id: 174,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T09:07:54.1624336+00:00',
      delayed: false
    });
  });

  it('should return true for "deleteFlight"', () => {
    expect(service.deleteFlight(4)).toEqual(true);
  });

  it('should return false for "deleteFlight"', () => {
    expect(service.deleteFlight(190)).toEqual(false);
  });
});
