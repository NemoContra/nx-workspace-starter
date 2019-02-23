import { Component, inject } from '@angular/core';
import type { Flight } from '@flight-app/shared';
import { FlightService } from './flight.service';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { PassengerSearchComponent } from '../passenger-search/passenger-search.component';
import { CityPipe } from '../../shared/city.pipe';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    CityPipe,
    NgForOf,
    NgIf,
    FlightCardComponent,
    PassengerSearchComponent,
  ],
  providers: [FlightService],
})
export class FlightSearchComponent {
  from: string;
  to: string;
  flights: Flight[] = [];
  selectedFlight: Flight;
  message: string;
  searchError = '';

  basket: Record<string, boolean> = {
    // <-- Neue Eigenschaft
    '3': true,
    '5': true,
  };

  private flightService = inject(FlightService);

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
        this.searchError = '';
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
        if (errResp.status === 401) {
          this.searchError = 'Sie müssen sich zuerst einloggen!';
        }
      },
    });
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {
    this.flightService.save(this.selectedFlight).subscribe({
      next: (flight) => {
        this.selectedFlight = flight;
        this.message = 'Erfolgreich gespeichert!';
      },
      error: (errResponse) => {
        console.error('Fehler beim Speichern', errResponse);
        this.message = 'Fehler beim Speichern: ';
      },
    });
  }
}
