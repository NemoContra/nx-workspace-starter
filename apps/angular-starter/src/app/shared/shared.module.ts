import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityPipe } from './city.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe
  ],
  exports: [
    CityPipe
  ]
})
export class SharedModule {
}
