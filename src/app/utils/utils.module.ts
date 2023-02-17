import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from './phone-format.pipe';
import { CpfFormatPipe } from './cpf/cpf-format.pipe';
import { CnpjFormatPipe } from './cnpj/cnpj-format.pipe';

@NgModule({
  declarations: [PhoneFormatPipe, CpfFormatPipe, CnpjFormatPipe],
  imports: [CommonModule],
  exports: [PhoneFormatPipe, CpfFormatPipe, CnpjFormatPipe],
})
export class UtilsModule {}
