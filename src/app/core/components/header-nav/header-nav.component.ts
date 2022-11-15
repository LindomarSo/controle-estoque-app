import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  @Input('title') title: string = '';

  constructor(public accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {}

  logout(): void{
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
