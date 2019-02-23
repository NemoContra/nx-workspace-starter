import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet],
})
export class AppComponent {
  title = 'Hello World!';
}
