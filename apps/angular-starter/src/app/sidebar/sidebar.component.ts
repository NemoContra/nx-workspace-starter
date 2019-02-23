import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'flight-sidebar',
  templateUrl: 'sidebar.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class SidebarComponent {}
