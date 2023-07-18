import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Flight } from '@flight-app/shared';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'flight-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatDialogModule],
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
})
export class FlightEditComponent {
  private dialogRef = inject(MatDialogRef);
  private data = inject<{ flight: Flight }>(MAT_DIALOG_DATA);

  flight = this.data.flight;

  close(): void {
    this.dialogRef.close();
  }
}
