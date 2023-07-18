import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Flight } from '@flight-app/shared';

@Directive({ selector: '[flightDetails]', standalone: true })
export class FlightDetailsDirective implements OnInit {
  @Input() flightDetails: Flight;
  @HostBinding() title = '';

  @HostListener('click') public onClick(): void {
    alert(`From: ${this.flightDetails.from} to: ${this.flightDetails.to}`);
  }

  ngOnInit(): void {
    if (this.flightDetails) {
      this.title = `From: ${this.flightDetails.from} to: ${this.flightDetails.to}`;
    }
  }
}
