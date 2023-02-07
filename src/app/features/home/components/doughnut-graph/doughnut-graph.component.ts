import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { BarChartData } from 'src/app/shared/models/voluntary/barChartData';

@Component({
  selector: 'doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss'],
})
export class DoughnutGraphComponent implements OnInit {

  isLoading = false;
  barChartList: BarChartData[] = [];
  selectedYear: number = 0;
  yearsList:number[] = [];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.05
        }]
      }
    }
  };

  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {
      data: [0], label: 'Doações',
      backgroundColor: '#009AA9'
    },
    // {
    //   data: [65, 59, 80, 81, 56, 55, 40], label: 'Voluntários',
    //   backgroundColor: '#f44336'
    // }
  ];

  constructor(private donationService: DonationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getLastTenYears();
    this.getBarChartData(this.selectedYear.toString());
  }

  getLastTenYears(): void {
    const currentDate = new Date();
  
    for (let i = 0; i < 10; i++) {
      this.yearsList.push(currentDate.getFullYear() - (10 - i));
    }

    this.selectedYear = this.yearsList[9];
  }

  getBarChartData(year: string): void {
    this.donationService.getBarChartData(`${year}-01-01`).subscribe({
      next: (response: BarChartData[]) => {
        this.barChartList = response;
        this.barChartData[0].data = [];
        this.barChartLabels = [];

        response.forEach(x => {
          this.barChartLabels.push(x.mes);
          this.barChartData[0].data.push(x.value);
        });
        
        this.barChartLabels = this.barChartLabels?.map(str => str.charAt(0).toUpperCase() + str.slice(1, str.length));

        this.isLoading = true;
      },
      error: () => {
        this.toastr.error('Erro ao carregar painel');
      },
    });
  }

  onChange(event: any){
    this.getBarChartData(event);
  }
}
