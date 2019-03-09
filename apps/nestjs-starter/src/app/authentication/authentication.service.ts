import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTU0MDAwMDAwfQ.1aXg5qBdE0riDCNnY-0wVydW72MNKIQuVio7DLbVj7E';

  public login(username: string, password: string): {token: string} {
    if (username === 'admin' && password === 'password') {
      return {token: this.token};
    }
    throw new UnauthorizedException();
  }

  public isLoggedIn(token: string): boolean {
    return token === this.token;
  }
}
