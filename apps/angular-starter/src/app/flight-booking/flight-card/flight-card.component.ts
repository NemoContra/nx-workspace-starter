import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Flight } from '@flight-app/shared';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  imports: [RouterLink, DatePipe, NgStyle, NgIf],
  standalone: true,
})
export class FlightCardComponent {
  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  select() {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }
}
