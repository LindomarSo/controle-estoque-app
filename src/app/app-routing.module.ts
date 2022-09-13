import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path:'', redirectTo:'user/login', pathMatch: 'full' },
  { path:'user/login', component: LoginComponent },
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
