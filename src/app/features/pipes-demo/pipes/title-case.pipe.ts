import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTitleCase',
  standalone: true
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    
    // Split the string into words
    return value
      .toLowerCase()
      .split(' ')
      .map(word => {
        // Skip small words like 'a', 'an', 'the', 'and', etc. unless it's the first word
        const smallWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in'];
        return smallWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}