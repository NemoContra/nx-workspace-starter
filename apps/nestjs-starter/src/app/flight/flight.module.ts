import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UserMiddleware } from '../middleware/user.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightSchema } from './flight.schema';

@Module({
  controllers: [FlightController],
  providers: [FlightService, Logger, { provide: 'DELAY_TIME', useValue: 2000 }],
  imports: [MongooseModule.forFeature([{ name: 'Flight', schema: FlightSchema }])]
})
export class FlightModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(UserMiddleware)
      .with({
        id: 42,
        username: 'testuser',
        firstname: 'test',
        lastname: 'user',
        role: 'admin'
      })
      .forRoutes(FlightController);
  }
}
