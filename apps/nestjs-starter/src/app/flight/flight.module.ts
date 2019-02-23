import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlightController as FlightControllerV1 } from './flight.controller';
import { FlightController as FlightControllerV2 } from './v2/flight.controller';
import { FlightService as FlightServiceV1 } from './flight.service';
import { FlightService as FlightServiceV2 } from './v2/flight.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightSchema } from './flight.schema';

const mockUser = {
  id: 42,
  username: 'testuser',
  firstname: 'test',
  lastname: 'user',
  role: 'admin',
};

@Module({
  controllers: [FlightControllerV1, FlightControllerV2],
  providers: [
    FlightServiceV1,
    FlightServiceV2,
    Logger,
    { provide: 'DELAY_TIME', useValue: 2000 },
    { provide: 'USER', useValue: mockUser },
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'Flight', schema: FlightSchema }]),
  ],
})
export class FlightModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(UserMiddleware)
      .forRoutes(FlightControllerV1, FlightControllerV2);
  }
}
