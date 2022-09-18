import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account/account.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user = {} as User;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.spinner.show();
    this.accountService
      .getUser()
      .subscribe(
        (response: User) => {
          this.user = response;
        },
        (erro: any) => {
          console.error(erro);
          this.toastr.error('Erro ao carregar usuário logado.', 'Erro');
        }
      )
      .add(() => this.spinner.hide());
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
