import { Pipe, PipeTransform } from '@angular/core';
import { Language } from './config';

@Pipe({
  name: 'yesNo',
  standalone: true,
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean | undefined, language: Language): string {
    console.log('YESNOPIPIE CALLED');

    if (language === 'en') {
      return value ? 'yes' : 'no';
    }

    return value ? 'ja' : 'nein';
  }
}
