import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from './app/authentication/authentication.interceptor';
import { SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    importProvidersFrom(
      SocketIoModule.forRoot({
        url: '/',
        options: {
          transports: ['websocket'],
        },
      })
    ),
  ],
});
