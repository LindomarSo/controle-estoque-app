import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {MatTableModule} from '@angular/material/table';
import { UserListComponent } from './user-list/user-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule, 
    UserRoutingModule, 
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CoreModule
  ],
})
export class UserModule {}
