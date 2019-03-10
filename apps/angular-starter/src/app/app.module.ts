import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    HttpClientModule,
    FlightBookingModule,
    SocketIoModule.forRoot({
      url: '/',
      options: {
        transports: ['websocket']
      }
    })
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    AuthenticationComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
