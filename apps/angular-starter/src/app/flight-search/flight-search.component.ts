import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '@flight-app/shared';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlightService } from '../shared/flight.service';
import { YesNoPipe } from '../shared/yes-no.pipe';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'flight-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    YesNoPipe,
    FlightCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [YesNoPipe],
})
export class FlightSearchComponent {
  private fb = inject(NonNullableFormBuilder);
  private flightService = inject(FlightService);

  formGroup = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
  });

  flights: Flight[] = [];

  selectedFlight: Flight;
  basket: Record<number, boolean> = {};

  search(): void {
    const { from, to } = this.formGroup.value;

    if (!from || !to) {
      return;
    }

    this.flightService
      .find(from, to)
      .subscribe((flights) => (this.flights = flights));
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }
}
