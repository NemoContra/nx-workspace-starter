import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightNewsService } from './flight-news.service';
import { FlightNewsGateway } from './flight-news.gateway';
import { IsString } from 'class-validator';

class FlightNews {
  @IsString()
  news: string;
}

@Controller('news')
export class FlightNewsController {

  constructor(private readonly flightNewsService: FlightNewsService, private readonly flightNewsGateway: FlightNewsGateway) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  postFlightNews(@Body() {news}: FlightNews): void {
    this.flightNewsService.setFlightNews(news);
    this.flightNewsGateway.pushLatestFlightNews();
  }
}
