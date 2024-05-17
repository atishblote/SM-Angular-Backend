import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'openingTimeText',
  standalone: true
})
export class OpeningTimeTextPipe implements PipeTransform {
  transform(openingTime: string): string {
    // Split the time string into hours, minutes, and AM/PM parts
    const [timePart, amPmPart] = openingTime.split(' ');
    const [hoursStr, minutesStr] = timePart.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Convert AM/PM time to 24-hour format if needed
    if (amPmPart && amPmPart.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (amPmPart && amPmPart.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    // Calculate the opening time in minutes since midnight
    const openingTimeMinutes = hours * 60 + minutes;

    // Get the current date and time
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    // Calculate the current time in minutes since midnight
    const currentTimeMinutes = currentHours * 60 + currentMinutes;

    // Calculate the difference in minutes between current time and opening time
    const differenceMinutes = openingTimeMinutes - currentTimeMinutes;
    console.log(differenceMinutes)
    // Check if the opening time is near (within 30 minutes)
    if (differenceMinutes > 0 && differenceMinutes <= 30) {
      return '1';
    } else {
      return '0'; // No additional text if opening time is not near
    }
  }
}
