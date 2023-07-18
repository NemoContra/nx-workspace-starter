import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'flight-booking',
    loadChildren: () =>
      import('./flight-booking/flight-booking.routes').then(
        (m) => m.FLIGHT_BOOKING_ROUTES
      ),
  },
];
