import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AirportModule } from './airport/airport.module';
import { FlightNewsModule } from './flight-news/flight-news.module';

@Module({
  imports: [
    FlightModule,
    FlightNewsModule,
    PassengerModule,
    AuthenticationModule,
    AirportModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
