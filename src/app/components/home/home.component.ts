import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user = { } as User;

  constructor(private accountService: AccountService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void
  {
    this.spinner.show();
    this.accountService.getUser().subscribe(
      (response: User) => {
        this.user = response;
      },
      (erro: any) => {
        console.error(erro);
        this.toastr.error('erro ao carregar usuário logado');
       }
    ).add(() => this.spinner.hide());
  }

  logout(): void
  {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
