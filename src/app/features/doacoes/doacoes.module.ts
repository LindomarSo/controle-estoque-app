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
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxCurrencyModule } from 'ngx-currency';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { UtilsModule } from 'src/app/utils/utils.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CoreModule } from 'src/app/core/core.module';
import { DonationModalComponent } from './donation-modal/donation-modal.component';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { A11yModule } from '@angular/cdk/a11y';
import { DonationViewComponent } from './donation-view/donation-view.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonationUpdatesComponent } from './donation-updates/donation-updates.component';
export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
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
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    // NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    CommonModule,
    PipesModule,
    UtilsModule,
    DoacoesRoutingModule,
    A11yModule,
    CoreModule,
  ],
  declarations: [
    DoacoesComponent,
    DonationModalComponent,
    DonationViewComponent,
    DonationUpdatesComponent,
  ],
  exports: [DoacoesComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class DoacoesModule {}
