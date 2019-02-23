import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DatePipe implements PipeTransform {
  transform(value: string): Date | undefined {
    if (value) {
      return new Date(value);
    }
  }
}
