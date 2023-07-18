import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), importProvidersFrom(MatDialogModule)],
});
