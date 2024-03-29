import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bem-vindo',
  },
  {
    path: 'bem-vindo',
    loadChildren: () =>
      import('src/app/core/pages/welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
    data: {
      fullPage: true,
    },
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('src/app/features/home/home.module').then((m) => m.HomeModule),
    data: {
      fullPage: false,
      title: 'Início',
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/core/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
    data: {
      fullPage: true,
    },
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('src/app/features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () =>
      import('src/app/features/user/register/register.module').then(
        (m) => m.RegisterModule
      ),
    data: {
      fullPage: false,
    },
  },
  {
    path: 'doacoes',
    loadChildren: () =>
      import('src/app/features/doacoes/doacoes.module').then(
        (m) => m.DoacoesModule
      ),
    data: {
      fullPage: false,
      title: 'Doações',
    },
  },
  {
    path: 'voluntarios',
    loadChildren: () =>
      import('src/app/features/voluntary/voluntary.module').then(
        (m) => m.VoluntaryModule
      ),
    data: {
      fullPage: false,
      title: 'Volunatariado',
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
