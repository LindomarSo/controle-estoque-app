import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account/account.service';
import { User } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'telefone', 'email', 'perfil', 'acoes'];
  dataSource: User[] = [];
  userList: User[] = [];

  constructor(private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.accountService.getAllUsers().subscribe({
      next: (userList: User[]) => {
        this.userList = userList;
        this.dataSource = this.userList;
        console.log(this.dataSource)
      },
      error: () => {
        this.toastr.error('Erro ao busca lista de usuários');
      }
    });
  }

  getProfile(profile: User) {
    if (profile.userRoles.length > 0)
      return profile.userRoles[0].role.name;

    return '-';
  }
}
