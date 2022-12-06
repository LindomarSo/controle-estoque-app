import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjFormat'
})
export class CnpjFormatPipe implements PipeTransform {

  transform(cnpj: string): string {
    let firstGroup = cnpj.substring(0, 3);
    let secondGroup = cnpj.substring(3, 6);
    let thirdGroup = cnpj.substring(6, 9);
    let fourthGroup = cnpj.substring(9, 12);
    let fiveGroup = cnpj.substring(12, 14);

    return `${firstGroup}.${secondGroup}.${thirdGroup}/${fourthGroup}-${fiveGroup}`;
  }
}
