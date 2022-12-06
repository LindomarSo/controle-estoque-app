import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {

  transform(cpf: string): string {
    let firstGroup = cpf.substring(0, 3);
    let secondGroup = cpf.substring(3, 6);
    let thirdGroup = cpf.substring(6, 9);
    let fourthGroup = cpf.substring(9, 11);

    return `${firstGroup}.${secondGroup}.${thirdGroup}-${fourthGroup}`;
  }
}
