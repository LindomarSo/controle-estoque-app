import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LogoModule } from 'src/app/core/components/logo/logo.module';
import { CoreModule } from 'src/app/core/core.module';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    LogoModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    RegisterRoutingModule,
    CoreModule
  ],
})
export class RegisterModule {}
