import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DoughnutGraphComponent } from './components/doughnut-graph/doughnut-graph.component';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    MatButtonModule, 
    NgChartsModule, 
    MatSelectModule, 
    FormsModule,
    MatFormFieldModule
  ],
  declarations: [HomeComponent, DoughnutGraphComponent],
  exports: [HomeComponent],
})
export class HomeModule { }
