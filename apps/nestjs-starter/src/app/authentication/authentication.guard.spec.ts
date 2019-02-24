import { AuthenticationGuard } from './authentication.guard';
import { Controller, Get, INestApplication, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('AuthenticationGuard', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TestingController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return HTTP-Status 200', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('authorization', 'Bearer jwt123456token')
      .expect(200)
      .expect('success!');
  });

  it('should return HTTP-Status 403 for incorrect token', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('authorization', 'Bearer test')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });

  it('should return HTTP-Status 403 if no header is set', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });
});

@Controller('test')
@UseGuards(AuthenticationGuard)
class TestingController {

  @Get('')
  testFunction() {
    return 'success!';
  }

}
