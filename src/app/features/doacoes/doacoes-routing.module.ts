import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { DonationViewComponent } from './donation-view/donation-view.component';

const routes: Routes = [
  {
    path: '',
    component: DoacoesComponent,
    data: {
      fullPage: false,
      title: 'Doações',
    },
  },
  {
    path: ':id',
    component: DonationViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoacoesRoutingModule {}
