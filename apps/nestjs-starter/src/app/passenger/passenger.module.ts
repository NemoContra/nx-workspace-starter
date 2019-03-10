import { Logger, Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';

@Module({
  controllers: [PassengerController],
  providers: [{provide: Logger, useFactory: () => new Logger('PassengerModule')}]
})
export class PassengerModule {}
