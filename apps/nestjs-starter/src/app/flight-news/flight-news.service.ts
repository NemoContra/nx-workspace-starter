import { Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightNewsService {
  private flightNews = 'There are no news right now';

  public setFlightNews(news: string): void {
    this.flightNews = news;
  }

  public getFlightNews(): Observable<string> {
    return of(this.flightNews);
  }
}
