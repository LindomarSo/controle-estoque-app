import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { DonationModalComponent } from '../../doacoes/donation-modal/donation-modal.component';

@Component({
  selector: 'app-voluntary-detail',
  templateUrl: './voluntary-detail.component.html',
  styleUrls: ['./voluntary-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class VoluntaryDetailComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = [
    'materialDoado',
    'unidade',
    'destino',
    'quantidade',
    'estoque',
    'preco',
    'acoes',
  ];

  voluntaryId!: number;
  voluntary: any = {} as Voluntary;
  panelOpenState = false;
  checked = false;
  turnoOptions: string[] = ['Manhã', 'Tarde', 'Diurno'];

  constructor(
    private route: ActivatedRoute,
    private voluntaryService: VoluntaryService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.voluntaryId = +this.route.snapshot.params['id'];
    this.getVoluntaryById();
  }

  get isFisicPerson(): boolean {
    return this.voluntary.tipoEntidade === 'Pessoa Física';
  }

  getVoluntaryById(): void {
    this.spinner.show();

    this.voluntaryService
      .getVoluntaryById(this.voluntaryId)
      .subscribe({
        next: (voluntary: Voluntary) => {
          this.voluntary = voluntary;
          this.dataSource = this.voluntary.doacoes;
        },
        error: () => {
          this.toastr.error('Erro ao carregar voluntário');
        },
      })
      .add(() => this.spinner.hide());
  }

  onChangeDonations(donations: Donation[]) {
    this.voluntary.doacoes = donations;
    this.dataSource = this.voluntary.doacoes;
  }

  getDate(date: string): string {
    let data = date.substring(0, 10);
    let dateArray = data.split('-');

    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  }

  getTitle(title: string): string {
    let length = title.length;

    return length > 30 ? title.substring(0, 30) + '...' : title;
  }

  calculateAge(birthday: string) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age + ' anos';
  }

  newDonation(donator: any) {
    this.dialog.open(DonationModalComponent, { data: { donator: donator } });
  }
}
