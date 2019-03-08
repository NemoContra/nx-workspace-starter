import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from './flight.entity';

const mockUser = {
  id: 42,
  username: 'testuser',
  firstname: 'test',
  lastname: 'user',
  role: 'admin'
};

@Module({
  controllers: [FlightController],
  providers: [FlightService, Logger, { provide: 'USER', useValue: mockUser }],
  imports: [TypeOrmModule.forFeature([FlightEntity])]
})
export class FlightModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(UserMiddleware)
      .forRoutes(FlightController);
  }
}
