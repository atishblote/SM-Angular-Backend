import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDay',
  standalone: true
})
export class ShortenDayPipe implements PipeTransform {

  transform(daysString: string): string {
    const daysArray = daysString.split(',');

    const shortenedDays = daysArray.map((day) => {
      // Extract the first three characters of each day
      return day.substring(0, 3);
    });

    return shortenedDays.join(',');
  }

}
