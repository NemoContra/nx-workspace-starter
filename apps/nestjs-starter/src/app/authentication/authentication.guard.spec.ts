import { AuthenticationGuard } from './authentication.guard';
import { Controller, Get, INestApplication, MiddlewareConsumer, Module, NestModule, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UserMiddleware } from '../middleware/user.middleware';
import { AuthenticationService } from './authentication.service';

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
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTU0MDAwMDAwfQ.1aXg5qBdE0riDCNnY-0wVydW72MNKIQuVio7DLbVj7E')
      .expect(200)
      .expect('success!');
  });

  it('should return HTTP-Status 401 for incorrect token', () => {
    return request(app.getHttpServer())
      .get('/test')
      .set('authorization', 'Bearer test')
      .expect(401)
      .expect({
        statusCode: 401,
        error: 'Unauthorized'
      });
  });

  it('should return HTTP-Status 401 if no header is set', () => {
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

@Module({
  controllers: [TestingController],
  providers: [AuthenticationService, {provide: 'USER', useValue: {role: 'admin'}}]
})
class MockModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(UserMiddleware).forRoutes(TestingController)
  }
}
