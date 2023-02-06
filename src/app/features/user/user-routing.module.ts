import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
    data: {
      fullPage: true,
    },
  },
  {
    path: '',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
