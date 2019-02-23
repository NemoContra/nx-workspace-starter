import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FlightService } from '../flight-search/flight.service';
import type { Flight } from '@flight-app/shared';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
  imports: [NgIf, FormsModule],
  standalone: true,
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;

  flight: Flight;
  errors: string;

  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.showDetails = params['showDetails'];

      this.flightService.findById(this.id).subscribe({
        next: (flight) => {
          this.flight = flight;
          this.errors = '';
        },
        error: () => {
          this.errors = 'Fehler beim Laden';
        },
      });
    });
  }

  save() {
    this.flightService.save(this.flight).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.errors = 'Saving was successful!';
      },
      error: () => {
        this.errors = 'Error saving data';
      },
    });
  }
}
