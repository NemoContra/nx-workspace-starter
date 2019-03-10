import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  username: string;
  password: string;
  loginresult: string;

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.authenticationService.login(this.username, this.password)
        .subscribe(result => this.loginresult = result, error => this.loginresult = error);
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
