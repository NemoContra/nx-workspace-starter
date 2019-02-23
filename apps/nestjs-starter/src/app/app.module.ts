import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [FlightModule, PassengerModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
