import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    const time = ~~value.split(':')[0];

    if (time >= 5 && time < 12) {
      return `${value} am`;
    } else if (time >= 12 && time < 18) {
      return `${value} pm`;
    } else {
      return `${value} pm`;
    }
  }
}
