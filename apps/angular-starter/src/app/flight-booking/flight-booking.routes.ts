import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightSearchComponent,
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent,
  },
  {
    path: 'flight-edit/:id',
    component: FlightEditComponent,
  },
];

export default FLIGHT_BOOKING_ROUTES;
