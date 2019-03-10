import { Module } from '@nestjs/common';
import { FlightNewsController } from './flight-news.controller';
import { FlightNewsService } from './flight-news.service';
import { FlightNewsGateway } from './flight-news.gateway';

@Module({
  controllers: [FlightNewsController],
  providers: [FlightNewsService, FlightNewsGateway]
})
export class FlightNewsModule { }
