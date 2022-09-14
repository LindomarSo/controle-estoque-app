import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private account: AccountService){}

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser(): void
  {
    let user: User;

    if(localStorage.getItem('user') !== null)
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    else
      user = null!;

    if(user)
      this.account.setCurrentUser(user);
  }
}
