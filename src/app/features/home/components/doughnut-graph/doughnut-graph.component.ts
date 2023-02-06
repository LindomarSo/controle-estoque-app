import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {
  
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {
      data: [65, 59, 80, 81, 56, 55, 40], label: 'Doações',
      backgroundColor: '#009AA9'
    },
    {
      data: [65, 59, 80, 81, 56, 55, 40], label: 'Voluntários',
      backgroundColor: '#f44336'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {

  }
}
