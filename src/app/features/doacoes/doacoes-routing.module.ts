import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { DoacoesComponent } from './doacoes/doacoes.component';

const routes: Routes = [
  {
    path: '',
    component: DoacoesComponent,
    data: {
      fullPage: false,
      title: 'Doações',
    },
  },{
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
