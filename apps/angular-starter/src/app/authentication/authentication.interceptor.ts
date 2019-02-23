import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export function authenticationInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const authenticationService = inject(AuthenticationService);

  return next(
    req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${authenticationService.getToken()}`
      ),
    })
  );
}
