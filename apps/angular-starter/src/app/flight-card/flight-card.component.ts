import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '@flight-app/shared';
import { CityPipe } from '../shared/city.pipe';
import { MatDialog } from '@angular/material/dialog';
import { FlightEditComponent } from '../flight-edit/flight-edit.component';

export const initFlight: Flight = {
  id: 0,
  from: '',
  to: '',
  date: '',
  delayed: false,
};

@Component({
  selector: 'flight-card',
  standalone: true,
  imports: [CommonModule, CityPipe],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input() item: Flight = initFlight;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  private dialog = inject(MatDialog);

  select(): void {
    this.selected = true;
    this.selectedChange.emit(this.selected);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.emit(this.selected);
  }

  edit() {
    this.dialog.open(FlightEditComponent, {
      data: { flight: this.item },
      minWidth: '80%',
    });
  }
}
