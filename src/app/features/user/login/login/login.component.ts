import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account/account.service';
import { Login } from 'src/app/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  public passwordVisible = false;
  public load = false;

  constructor(
    private account: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.spinner.show();

    let login: Login = {
      userName: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.account
      .login(login)
      .subscribe(
        () => {
          this.router.navigate(['/inicio']);
        },
        (erro: any) => {
          this.toastr.error('Usuário ou senha inválidos');
        }
      )
      .add(() => this.spinner.hide());
  }
}
