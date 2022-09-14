import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'', redirectTo:'user/login', pathMatch: 'full' },
  { path:'user/login', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      { path: 'home', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
