import { Component, inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class AuthenticationComponent {
  username: string;
  password: string;
  loginresult: string;

  private authenticationService = inject(AuthenticationService);

  login() {
    if (this.username && this.password) {
      this.authenticationService.login(this.username, this.password).subscribe({
        next: (result) => (this.loginresult = result),
        error: (error) => (this.loginresult = error),
      });
    }
  }

  logout() {
    this.loginresult = '';
    this.authenticationService.logout();
  }

  get isLoggedIn(): boolean {
    return !!this.authenticationService.getToken();
  }
}
