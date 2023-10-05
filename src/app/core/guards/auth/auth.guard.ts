import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    if (localStorage.getItem('user') !== null) return true;

    this.toastr.info('Usuário não autenticado');
    this.router.navigate(['/user/login']);

    return false;
  }
}
