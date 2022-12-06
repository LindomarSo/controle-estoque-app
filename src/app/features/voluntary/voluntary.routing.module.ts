import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVoluntaryComponent } from './create-voluntary/create-voluntary.component';
import { DefaultComponent } from './default/default.component';
import { VoluntaryDetailComponent } from './voluntary-detail/voluntary-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'criar-voluntario/:pessoa',
    component: CreateVoluntaryComponent,
  },
  {
    path: 'detalhe/:id',
    component: VoluntaryDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryRoutingModule { }
