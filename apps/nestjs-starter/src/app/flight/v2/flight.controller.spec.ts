import { Test } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { Logger, NotFoundException } from '@nestjs/common';
import { FlightService } from './flight.service';
import { AuthenticationService } from '../../authentication/authentication.service';

jest.mock('./flight.service');
jest.mock('../../authentication/authentication.service');

describe('FlightController', () => {
  let controller: FlightController;
  let service: jest.Mocked<FlightService>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [FlightService, AuthenticationService, Logger],
    }).compile();

    controller = module.get(FlightController);
    service = module.get(FlightService);
  });

  describe('getFlights', () => {
    it('should call searchFlights on FlightService with correct parameters', async () => {
      await controller.getFlights(
        'Hamburg',
        'Graz',
        '2019-02-22T07:00:00.0000000+00:00',
        '2019-02-22T08:00:00.0000000+00:00'
      );

      expect(service.searchFlights).toHaveBeenCalledWith(
        'Hamburg',
        'Graz',
        '2019-02-22T07:00:00.0000000+00:00',
        '2019-02-22T08:00:00.0000000+00:00'
      );
    });
  });

  describe('getFlightById', () => {
    it('should call getFlightById on FlightService with correct parameters', async () => {
      await controller.getFlightById('4');

      expect(service.getFlightById).toHaveBeenCalledWith(4);
    });
  });

  describe('createFlight', () => {
    it('should call createFlight on FlightService with correct parameters', async () => {
      await controller.createFlight({
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });

      expect(service.createFlight).toHaveBeenCalledWith({
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: false,
      });
    });
  });

  describe('updateFlight', () => {
    it('should call updateFlight on FlightService with correct parameters', async () => {
      await controller.updateFlight({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
      });

      expect(service.updateFlight).toHaveBeenCalledWith({
        id: 174,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T09:07:54.1624336+00:00',
        delayed: true,
      });
    });
  });

  describe('deleteFlight', () => {
    it('should call deleteFlight on FlightService with correct parameters', async () => {
      service.deleteFlight.mockResolvedValueOnce(true);

      await controller.deleteFlightById('174');

      expect(service.deleteFlight).toHaveBeenCalledWith(174);
    });

    it('should call deleteFlight on FlightService with correct parameters and throw NotFoundException', async () => {
      service.deleteFlight.mockResolvedValueOnce(false);

      await expect(() => controller.deleteFlightById('174')).rejects.toThrow(
        new NotFoundException('Flight not found.')
      );

      expect(service.deleteFlight).toHaveBeenCalledWith(174);
    });
  });
});
