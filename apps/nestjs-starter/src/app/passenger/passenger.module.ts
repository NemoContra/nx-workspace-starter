import { Logger, Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  controllers: [PassengerController],
  providers: [
    PassengerService,
    {provide: Logger, useFactory: () => new Logger('PassengerModule')}
  ]
})
export class PassengerModule {
}
