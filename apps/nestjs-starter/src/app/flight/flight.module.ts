import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightDao, FlightSchema } from './flight.schema';

const mockUser = {
  id: 42,
  username: 'testuser',
  firstname: 'test',
  lastname: 'user',
  role: 'admin',
};

@Module({
  controllers: [FlightController],
  providers: [FlightService, Logger, { provide: 'USER', useValue: mockUser }],
  imports: [
    MongooseModule.forFeature([{ name: FlightDao.name, schema: FlightSchema }]),
  ],
})
export class FlightModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(UserMiddleware).forRoutes(FlightController);
  }
}
