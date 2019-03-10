import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class PassengerService {
  private passengers: string[] = [
    'Max Mustermann',
    'Pablo Lellinger',
    'Paul Palme',
    'Fridolin Flieger'
  ];

  public getPassengers(): Observable<string[]> {
    // Delay to simulate a heavy operation that will take 2 seconds to return
    return of(this.passengers).pipe(
      delay(2000)
    );
  }
}
