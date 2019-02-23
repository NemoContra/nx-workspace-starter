import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { CoreModule } from './core/core.module';
import { FlightEntity } from './flight/flight.entity';

@Module({
  imports: [
    FlightModule,
    PassengerModule,
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flightapp',
      entities: [FlightEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
