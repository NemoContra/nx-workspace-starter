import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextFlightsComponent } from './apps/angular-starter/src/app/next-flights/next-flights.component';

@NgModule({
  declarations: [NextFlightsComponent],
  imports: [CommonModule],
  exports: [NextFlightsComponent],
})
export class NextFlightsModule {}
