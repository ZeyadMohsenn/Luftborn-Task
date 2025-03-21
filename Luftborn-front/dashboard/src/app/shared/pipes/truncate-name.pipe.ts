import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
export class TruncateNamePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) {
      return '';
    }

    return value.length > maxLength
      ? value.substring(0, maxLength) 
      : value;
  }
}
