import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [EllipsisPipe],
  exports: [EllipsisPipe],
  providers: [],
})
export class PipesModule {}
