import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FlightController } from './flight.controller';
import { INestApplication, Logger } from '@nestjs/common';
import { FlightService } from './flight.service';

describe('Flight Controller', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [FlightService, Logger]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return an empty array for GET "/flight"', () => {
    return request(app.getHttpServer())
      .get('/flight')
      .set('authorization', 'Bearer jwt123456token')
      .expect(200)
      .expect([]);
  });

  it('should return correct flights for GET "/flight?from=Hamburg&to=Graz"', () => {
    return request(app.getHttpServer())
      .get('/flight?from=Hamburg&to=Graz')
      .set('authorization', 'Bearer jwt123456token')
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
      .set('authorization', 'Bearer jwt123456token')
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
      .set('authorization', 'Bearer jwt123456token')
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
      .set('authorization', 'Bearer jwt123456token')
      .expect(200)
      .expect({});
  });

  it('should return HTTP-Status 404 for DELETE "/flight/175"', () => {
    return request(app.getHttpServer())
      .delete('/flight/175')
      .set('authorization', 'Bearer jwt123456token')
      .expect(404)
      .expect({ statusCode: 404, error: 'Not Found', message: 'Flight not found.' });
  });

  it('should return HTTP-Status 401 if no "Authorization" Header is set', () => {
    return request(app.getHttpServer())
      .get('/flight')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
