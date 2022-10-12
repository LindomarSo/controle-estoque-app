import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';

const routes: Routes = [
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
    data: {
      fullPage: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
