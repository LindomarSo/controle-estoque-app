import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjFormat'
})
export class CnpjFormatPipe implements PipeTransform {

  transform(cnpj: string): string {
    let firstGroup = cnpj?.substring(0, 2);
    let secondGroup = cnpj?.substring(2, 5);
    let thirdGroup = cnpj?.substring(5, 8);
    let fourthGroup = cnpj?.substring(8, 12);
    let fiveGroup = cnpj?.substring(12, 14);

    return `${firstGroup}.${secondGroup}.${thirdGroup}/${fourthGroup}-${fiveGroup}`;

    // cnpj = cnpj.replace(/\D/g, "");
    // cnpj = cnpj.padEnd(14, "0");
  
    // return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
}
