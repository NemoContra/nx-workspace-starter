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
    expect(service.searchFlights('', '')).toEqual([]);
  });

  it('should return correct flights if "Stuttgart" and "Salzburg" is passed in "searchFlights"', () => {
    const result = service.searchFlights(
      'Stuttgart',
      'Salzburg',
      new Date('2019-02-28T00:06:54'),
      new Date('2019-03-02T00:08:54')
    );
    expect(result.length).toEqual(3);
    expect(result).toEqual([
      {
        id: 171,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T09:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 172,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T10:07:54.1624336+00:00',
        delayed: false
      },
      {
        id: 173,
        from: 'Stuttgart',
        to: 'Salzburg',
        date: '2019-03-01T11:07:54.1624336+00:00',
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

  it('should return true for "deleteFlight"', () => {
    expect(service.deleteFlight(4)).toEqual(true);
  });

  it('should return false for "deleteFlight"', () => {
    expect(service.deleteFlight(190)).toEqual(false);
  });
});
