import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { PagesService } from './core/domains/pages.service';
import { AccountService } from './core/services/account/account.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  fullPage = true;

  constructor(
    private account: AccountService,
    public pageService: PagesService,
    private router: Router
  ) {
    this.router.events.subscribe((value) => {
      if (value instanceof ActivationEnd) {
        if (value.snapshot.data['title']) {
          this.pageService.changeTitle(value.snapshot.data['title']);
        }

        if (value.snapshot.data['fullPage']) {
          this.fullPage = value.snapshot.data['fullPage'];
        }

        if (!value.snapshot.data['fullPage']) {
          this.fullPage = false;
        }
      }
    });
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    let user: User;

    if (localStorage.getItem('user') !== null)
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    else user = null!;

    if (user) this.account.setCurrentUser(user);
  }
}
