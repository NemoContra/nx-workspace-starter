import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
