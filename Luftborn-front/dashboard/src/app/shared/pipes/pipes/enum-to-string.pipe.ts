import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString',
  standalone: true
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: number | boolean, status: { label: string; labelAr: string; value: number| boolean }[], isArabic: boolean): string {
    const found = status.find((item) => item.value === value);
    if (found) {
      return isArabic ? found.labelAr : found.label;  
    }
    return 'Unknown';  
  }
}
