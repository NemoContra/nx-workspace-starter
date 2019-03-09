import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    FlightModule,
    PassengerModule,
    CoreModule,
    MongooseModule.forRoot('mongodb://heroku_nhjc4749:3efp4l15pvjqmm4k0ud7klfb0i@ds263295.mlab.com:63295/heroku_nhjc4749')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
