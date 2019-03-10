import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Observable<string> {
    return this.httpClient.post<{ token: string }>('api/login', { username, password })
      .pipe(
        tap(res => localStorage.setItem('token', res.token)),
        map(() => 'Login erfolgreich!'),
        catchError(() => of('Login fehlgeschlagen!'))
      );
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.clear();
  }
}
