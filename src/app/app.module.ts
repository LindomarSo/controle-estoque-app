import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';

import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    // ToastrModule.forRoot({
    //   progressBar: true,
    //   timeOut: 3000,
    //   positionClass: 'toast-bottom-right',
    //   preventDuplicates: true,
    // }),
    NgxSpinnerModule,
  ],
  providers: [
   // ToastrService,
    NgxSpinnerService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
