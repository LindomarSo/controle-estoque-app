import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DoughnutGraphComponent } from './components/doughnut-graph/doughnut-graph.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MatButtonModule, NgChartsModule],
  declarations: [HomeComponent, DoughnutGraphComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
