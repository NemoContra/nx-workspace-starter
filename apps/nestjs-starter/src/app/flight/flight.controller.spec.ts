import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FlightController } from './flight.controller';
import {
  INestApplication,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { CoreModule } from '../core/core.module';
import { Flight } from '@flight-app/shared';
import { getModelToken } from '@nestjs/mongoose';
import { AuthenticationModule } from '../authentication/authentication.module';

describe('Flight Controller', () => {
  const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTU0MDAwMDAwfQ.1aXg5qBdE0riDCNnY-0wVydW72MNKIQuVio7DLbVj7E';
  let app: INestApplication;
  let module: TestingModule;
  let flightService: FlightService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MockModule, CoreModule, AuthenticationModule]
    }).compile();

    flightService = module.get<FlightService>(FlightService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should return an empty array for GET "/flight"', () => {
    spyOn(flightService, 'searchFlights').and.returnValue(Promise.resolve([]));
    return request(app.getHttpServer())
      .get('/flight')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .expect(200)
      .expect([]);
  });

  it('should return correct flights for GET "/flight?from=Hamburg&to=Graz"', () => {
    const mockFlights: Flight[] = [
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
    ];
    spyOn(flightService, 'searchFlights').and.returnValue(Promise.resolve(mockFlights));
    return request(app.getHttpServer())
      .get('/flight?from=Hamburg&to=Graz')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .expect(200)
      .expect(mockFlights);
  });

  it('should return correct flight for GET "/flight/3', () => {
    spyOn(flightService, 'getFlightById').and.returnValue({
      id: 3,
      from: 'Hamburg',
      to: 'Graz',
      date: '2019-02-22T07:07:54.1624336+00:00',
      delayed: false
    });

    return request(app.getHttpServer())
      .get('/flight/3')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .expect(200)
      .expect({
        id: 3,
        from: 'Hamburg',
        to: 'Graz',
        date: '2019-02-22T07:07:54.1624336+00:00',
        delayed: false
      });
  });

  it('should successfully create a new flight for POST "/flight"', () => {
    const mockFlight: Flight = {
      from: 'Stuttgart',
      to: 'Hamburg',
      date: '2019-02-23T07:07:54.1624336+00:00',
      delayed: false,
      id: 174
    };
    spyOn(flightService, 'createFlight').and.returnValue(Promise.resolve(mockFlight));
    return request(app.getHttpServer())
      .post('/flight')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .send({
        from: 'Stuttgart',
        to: 'Hamburg',
        date: '2019-02-23T07:07:54.1624336+00:00',
        delayed: false,
        id: 3
      })
      .expect(201)
      .expect(mockFlight);
  });

  it('should return HTTP-Status 400 for an invalid Flight for POST "/flight"', () => {
    return request(app.getHttpServer())
      .post('/flight')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .send({
        from: 'Stuttgart',
        to: 1,
        date: '2019-02-23T07:07:54.1624336+00:00',
        delayed: false,
        id: 3
      })
      .expect(400);
  });

  it('should successfully delete a flight for DELETE "/flight/174"', () => {
    spyOn(flightService, 'deleteFlight').and.returnValue(true);
    return request(app.getHttpServer())
      .delete('/flight/174')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .expect(200)
      .expect({});
  });

  it('should return HTTP-Status 404 for DELETE "/flight/175"', () => {
    spyOn(flightService, 'deleteFlight').and.returnValue(false);
    return request(app.getHttpServer())
      .delete('/flight/175')
      .set('authorization', 'Bearer ' + MOCK_TOKEN)
      .expect(404)
      .expect({ statusCode: 404, error: 'Not Found', message: 'Flight not found.' });
  });

  it('should return HTTP-Status 401 if no "Authorization" Header is set', () => {
    return request(app.getHttpServer())
      .get('/flight')
      .expect(401)
      .expect({ statusCode: 401, error: 'Unauthorized' });
  });

  afterAll(async () => {
    await app.close();
  });
});

@Module({
  controllers: [FlightController],
  providers: [
    FlightService,
    Logger,
    {
      provide: getModelToken('Flight'),
      useValue: ''
    }
  ]
})
class MockModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(UserMiddleware).with({ role: 'admin' }).forRoutes(FlightController);
  }
}

