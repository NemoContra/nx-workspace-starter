import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { FlightService as FlightServiceV1 } from '../flight.service';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('../flight.service');

describe('FlightService', () => {
  let service: FlightService;
  let serviceV1: jest.Mocked<FlightServiceV1>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightService,
        FlightServiceV1,
        {
          provide: getModelToken('Flight'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get(FlightService);
    serviceV1 = module.get(FlightServiceV1);
  });

  describe('searchFlights', () => {
    it('should call searchFlights on FlightService V1 with correct parameters and add version property to result', async () => {
      serviceV1.searchFlights.mockResolvedValueOnce([
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

      const result = await service.searchFlights(
        'Stuttgart',
        'Salzburg',
        '2019-02-28T00:06:54',
        '2019-03-02T00:08:54'
      );

      expect(serviceV1.searchFlights).toHaveBeenCalledWith(
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
          version: 2,
        },
        {
          id: 172,
          from: 'Stuttgart',
          to: 'Salzburg',
          date: '2019-03-01T10:07:54.1624336+00:00',
          delayed: false,
          version: 2,
        },
        {
          id: 173,
          from: 'Stuttgart',
          to: 'Salzburg',
          date: '2019-03-01T11:07:54.1624336+00:00',
          delayed: false,
          version: 2,
        },
      ]);
    });
  });

  describe('getFlightById', () => {
    it('should call getFlightById on FlightService V1 with correct parameters and add version property to result', async () => {
      serviceV1.getFlightById.mockResolvedValueOnce({
        id: 4,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });

      const result = await service.getFlightById(4);

      expect(serviceV1.getFlightById).toHaveBeenCalledWith(4);

      expect(result).toEqual({
        id: 4,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
        version: 2,
      });
    });
  });

  describe('createFlight', () => {
    it('should call createFlight on FlightService V1 with correct parameters and add version property to result', async () => {
      serviceV1.createFlight.mockResolvedValueOnce({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });

      const result = await service.createFlight({
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });

      expect(serviceV1.createFlight).toHaveBeenCalledWith({
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });

      expect(result).toEqual({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
        version: 2,
      });
    });
  });

  describe('updateFlight', () => {
    it('should call updateFlight on FlightService V1 with correct parameters and add version property to result', async () => {
      serviceV1.updateFlight.mockResolvedValueOnce({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
      });

      const result = await service.updateFlight({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
      });

      expect(serviceV1.updateFlight).toHaveBeenCalledWith({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
      });

      expect(result).toEqual({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
        version: 2,
      });
    });
  });

  describe('deleteFlight', () => {
    it('should call deleteFlight on FlightService V1 with correct parameters and add version property to result', async () => {
      serviceV1.deleteFlight.mockResolvedValueOnce(true);

      const result = await service.deleteFlight(174);

      expect(serviceV1.deleteFlight).toHaveBeenCalledWith(174);

      expect(result).toBe(true);
    });
  });
});
