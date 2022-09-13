import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from 'src/app/models/Login';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model = { } as Login;
  public load = false;

  constructor(//private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private account: AccountService) { }

  ngOnInit() {
  }

  login(): void
  {
    this.spinner.show();
  }
}
