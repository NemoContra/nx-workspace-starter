import { Routes } from '@angular/router';
import { NextFlightsComponent } from '../next-flights/next-flights.component';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'passenger',
    component: NextFlightsComponent,
  },
];
