import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [AuthenticationComponent],
})
export class HomeComponent {}
