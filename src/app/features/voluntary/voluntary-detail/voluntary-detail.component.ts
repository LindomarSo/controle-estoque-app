import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { DonationDetailComponent } from '../../doacoes/donation-detail/donation-detail.component';

@Component({
  selector: 'app-voluntary-detail',
  templateUrl: './voluntary-detail.component.html',
  styleUrls: ['./voluntary-detail.component.scss'], 
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VoluntaryDetailComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['materialDoado', 'destino', 'unidade', 'quantidade', 'estoque', 'acoes'];

  voluntaryId!: number;
  voluntary: Voluntary = {} as Voluntary;
  panelOpenState = false;
  checked = false;
  turnoOptions: string[] = ['Manhã', 'Tarde', 'Diurno' ];

  constructor(private route: ActivatedRoute,
              private voluntaryService: VoluntaryService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.voluntaryId = +this.route.snapshot.params['id'];
    this.getVoluntaryById();
  }

  get isFisicPerson(): boolean{
    return this.voluntary.tipoEntidade === 'Pessoa Física';
  }

  getVoluntaryById(): void {
    this.spinner.show();

    this.voluntaryService.getVoluntaryById(this.voluntaryId).subscribe({
      next: (voluntary: Voluntary) => {
        this.voluntary = voluntary;
        this.dataSource = this.voluntary.doacoes;
      },
      error: () => {
        this.toastr.error('Erro ao carregar voluntário');
      }
    }).add(() => this.spinner.hide());
  }

  onChangeDonations(donations: Donation[]){
    this.voluntary.doacoes = donations;
    this.dataSource = this.voluntary.doacoes;
  }

  openDialog(donation: Donation) {
    donation.entidadeId = this.voluntaryId;
    this.dialog.open(DonationDetailComponent, { data: { donate: donation, voluntaryId: this.voluntaryId }});
  }

  getDate(date: string): string {
    let data = date.substring(0, 10);
    let dateArray = data.split('-');

    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  }

  getTitle(title: string): string{
    let length = title.length;

    return length > 30 ? title.substring(0, 30)+'...' : title;
  }
}
