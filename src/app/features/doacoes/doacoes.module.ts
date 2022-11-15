import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { DoacoesRoutingModule } from './doacoes-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
    DoacoesRoutingModule
  ],
  declarations: [DoacoesComponent, CreateDonationComponent],
  exports: [DoacoesComponent, CreateDonationComponent],
})
export class DoacoesModule { }
