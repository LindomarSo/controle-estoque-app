import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(text: string, maxSize: number): string {
    return text.length > maxSize ? text.slice(0, maxSize) + '...' : text;
  }
}
