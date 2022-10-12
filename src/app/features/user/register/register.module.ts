import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LogoModule } from 'src/app/core/components/logo/logo.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    LogoModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}
