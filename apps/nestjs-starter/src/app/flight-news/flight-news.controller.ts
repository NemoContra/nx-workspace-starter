import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FlightNewsService } from './flight-news.service';
import { FlightNewsGateway } from './flight-news.gateway';

@Controller('news')
export class FlightNewsController {

  constructor(private readonly flightNewsService: FlightNewsService, private readonly flightNewsGateway: FlightNewsGateway) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  postFlightNews(@Body('news') flightNews: string): void {
    this.flightNewsService.setFlightNews(flightNews);
    this.flightNewsGateway.pushLatestFlightNews();
  }
}
