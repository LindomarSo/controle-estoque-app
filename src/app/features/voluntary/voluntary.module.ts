import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { VoluntaryRoutingModule } from './voluntary.routing.module';
import { ListVoluntaryComponent } from './list-voluntary/list-voluntary.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateVoluntaryComponent } from './create-voluntary/create-voluntary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePersonLegalComponent } from './create-person-legal/create-person-legal.component';
import { DefaultComponent } from './default/default.component';
import { ListPartnerComponent } from './list-partner/list-partner.component';


@NgModule({
  declarations: [
    ListVoluntaryComponent,
    CreateVoluntaryComponent,
    CreatePersonLegalComponent,
    DefaultComponent,
    ListPartnerComponent
  ],
  imports: [
    CommonModule,
    VoluntaryRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListVoluntaryComponent,
    CreateVoluntaryComponent
  ]
})
export class VoluntaryModule { }
