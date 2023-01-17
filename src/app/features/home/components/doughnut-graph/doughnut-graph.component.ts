import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      { data: [350, 450, 100], label: 'Series A' },
      { data: [50, 150, 120], label: 'Series B' },
      { data: [250, 130, 70], label: 'Series C' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    // this.chart = new Chart('MyChart', {
    //   type: 'bar', //this denotes tha type of chart
    //   data: {
    //     // values on X-Axis
    //     labels: [
    //       '2022-05-10',
    //       '2022-05-11',
    //       '2022-05-12',
    //       '2022-05-13',
    //       '2022-05-14',
    //       '2022-05-15',
    //       '2022-05-16',
    //       '2022-05-17',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Sales',
    //         data: ['467', '576', '572', '79', '92', '574', '573', '576'],
    //         backgroundColor: 'blue',
    //       },
    //       {
    //         label: 'Profit',
    //         data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
    //         backgroundColor: 'limegreen',
    //       },
    //     ],
    //   },
    //   options: {
    //     aspectRatio: 2.5,
    //   },
    // });
  }
}
