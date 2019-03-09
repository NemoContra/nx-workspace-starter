import { AuthenticationGuard } from './authentication.guard';
import { Controller, Get, INestApplication, MiddlewareConsumer, Module, NestModule, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserMiddleware } from '../middleware/user.middleware';

describe('AuthenticationGuard', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MockModule]
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
      .expect(418)
      .expect({
        statusCode: 418,
        message: 'I\'m a Teapot'
      });
  });

  it('should return HTTP-Status 403 if no header is set', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(418)
      .expect({
        statusCode: 418,
        message: 'I\'m a Teapot'
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

@Module({
  controllers: [TestingController]
})
class MockModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(UserMiddleware).with({role: 'admin'}).forRoutes(TestingController)
  }
}
