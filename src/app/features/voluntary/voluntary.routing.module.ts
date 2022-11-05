import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVoluntaryComponent } from './create-voluntary/create-voluntary.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'criar-voluntario/:pessoa',
    component: CreateVoluntaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryRoutingModule { }
