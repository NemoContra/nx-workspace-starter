import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FlightController } from './flight.controller';
import { INestApplication } from '@nestjs/common';

describe('Flight Controller', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlightController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return an empty array for GET "/flight"', () => {
    return request(app.getHttpServer())
      .get('/flight')
      .expect(200)
      .expect([]);
  });

  it('should return correct flights for GET "/flight?from=Hamburg&to=Graz"', () => {
    return request(app.getHttpServer())
      .get('/flight?from=Hamburg&to=Graz')
      .expect(200)
      .expect([
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

  it('should return correct flight for GET "/flight/3', () => {
    return request(app.getHttpServer())
      .get('/flight/3')
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
    return request(app.getHttpServer())
      .post('/flight')
      .send({
        from: 'Stuttgart',
        to: 'Hamburg',
        date: '2019-02-23T07:07:54.1624336+00:00',
        delayed: false,
        id: 3
      })
      .expect(201)
      .expect({
        from: 'Stuttgart',
        to: 'Hamburg',
        date: '2019-02-23T07:07:54.1624336+00:00',
        delayed: false,
        id: 174
      });
  });

  it('should successfully delete a flight for DELETE "/flight/174"', () => {
    return request(app.getHttpServer())
      .delete('/flight/174')
      .expect(200)
      .expect({});
  });

  it('should return HTTP-Status 404 for DELETE "/flight/175"', () => {
    return request(app.getHttpServer())
      .delete('/flight/175')
      .expect(404)
      .expect({ statusCode: 404, message: 'Flight not found.' });
  });

  afterAll(async () => {
    await app.close();
  });
});
