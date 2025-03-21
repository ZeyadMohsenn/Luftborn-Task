import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviationName',
  standalone: true,
})
export class AbbreviationNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value) {
      let names = value.split(' ');
      let abbreviation = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
        abbreviation += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return abbreviation;
    } else {
      return '';
    }
  }
}
