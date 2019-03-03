import { CustomHttpFilter } from './custom-http.filter';
import {
  Controller,
  Get,
  ImATeapotException,
  INestApplication,
  UseFilters
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('CustomHttpFilter', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestingController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return custom message for a HttpException', async () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(418)
      .expect({ message: 'Custom message!' });
  });
});


@Controller('test')
@UseFilters(CustomHttpFilter)
class TestingController {

  @Get('')
  testFunction() {
    throw new ImATeapotException();
  }
}
