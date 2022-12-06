import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { VoluntaryRoutingModule } from './voluntary.routing.module';
import { ListVoluntaryComponent } from './list-voluntary/list-voluntary.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxCurrencyModule } from "ngx-currency";
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateVoluntaryComponent } from './create-voluntary/create-voluntary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';
import { DoacoesModule } from '../doacoes/doacoes.module';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask'
import { PhoneFormatPipe } from 'src/app/utils/phone-format.pipe';
import { CpfFormatPipe } from 'src/app/utils/cpf/cpf-format.pipe';
import { CnpjFormatPipe } from 'src/app/utils/cnpj/cnpj-format.pipe';
import { VoluntaryDetailComponent } from './voluntary-detail/voluntary-detail.component';


@NgModule({
  declarations: [
    ListVoluntaryComponent,
    CreateVoluntaryComponent,
    DefaultComponent,
    ListPartnerComponent,
    CpfFormatPipe,
    CnpjFormatPipe,
    PhoneFormatPipe,
    VoluntaryDetailComponent,
  ],
  imports: [
    CommonModule,
    VoluntaryRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot(),
    DoacoesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListVoluntaryComponent,
    CreateVoluntaryComponent
  ]
})
export class VoluntaryModule { }
