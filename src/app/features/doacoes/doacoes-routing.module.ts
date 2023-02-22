import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDonationComponent } from './create-donation/create-donation.component';
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
  },
  {
    path: 'adicionar-doacao',
    component: CreateDonationComponent,
    data: {
      fullPage: false,
      title: 'Doações',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoacoesRoutingModule {}
