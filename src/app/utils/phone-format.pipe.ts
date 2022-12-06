import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PhoneFormatPipe'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    if (typeof phoneNumber === 'string') {
      let code = phoneNumber.substring(0, 2);
      let firstGroup = phoneNumber.substring(2, 7);
      let secondGroup = phoneNumber.substring(7, 11);
      return `(${code}) ${firstGroup}-${secondGroup}`;
    }

    return '';
  }
}
