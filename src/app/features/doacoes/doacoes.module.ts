import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { DoacoesRoutingModule } from './doacoes-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DonationDetailComponent } from './donation-detail/donation-detail.component';
import { DonationViewComponent } from './donation-view/donation-view.component';
import { PhoneFormatPipe } from 'src/app/utils/phone-format.pipe';
import { VoluntaryModule } from '../voluntary/voluntary.module';
import { UtilsModule } from 'src/app/utils/utils.module';
import { DonationDefaultComponent } from './donation-default/donation-default.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@NgModule({
  imports: [
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    CommonModule,
    UtilsModule,
    DoacoesRoutingModule
  ],
  declarations: [
    DoacoesComponent, 
    CreateDonationComponent, 
    DonationDetailComponent, 
    DonationViewComponent, DonationDefaultComponent,
  ],
  exports: [DoacoesComponent, CreateDonationComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})
export class DoacoesModule { }
