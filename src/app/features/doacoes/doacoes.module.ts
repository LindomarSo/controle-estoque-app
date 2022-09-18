import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { DoacoesRoutingModule } from './doacoes-routing.module';

@NgModule({
  imports: [CommonModule, DoacoesRoutingModule],
  declarations: [DoacoesComponent],
  exports: [DoacoesComponent],
})
export class DoacoesModule {}
