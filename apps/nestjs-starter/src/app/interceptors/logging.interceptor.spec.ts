import { LoggingInterceptor } from './logging.interceptor';
import {
  Controller,
  Get,
  INestApplication,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('LoggingInterceptor', () => {
  let app: INestApplication;
  let module: TestingModule;
  let logger: Logger;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestingController],
      providers: [LoggingInterceptor, Logger],
    }).compile();
    app = module.createNestApplication();
    logger = app.get<Logger>(Logger);
    await app.init();
  });

  it('should log Request URL and Response body', () => {
    const spy = jest.spyOn(logger, 'log');
    return request(app.getHttpServer())
      .get('/test')
      .then(() => {
        const calls = spy.mock.calls;
        expect(calls.length).toEqual(2);
        expect(calls[0]).toEqual(['Request-URL: /test']);
        expect(calls[1]).toEqual(['Response: "success!"']);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

@Controller('test')
@UseInterceptors(LoggingInterceptor)
class TestingController {
  @Get('')
  testFunction() {
    return 'success!';
  }
}
