import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.scss']
})
export class DonationDetailComponent implements OnInit {

  form!: FormGroup;
  isDonationDefault: boolean = true;
  unities: string[] = [];
  unidade = '';
  entidadeId = 0;
  turnoOptions: string[] = ['Manhã', 'Tarde', 'Diurno' ];
  @Input('donation') donation!: Donation;
  availability = null;
  @Output('donationUpdated') donationUpdated: EventEmitter<Donation> = new EventEmitter();

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private donationService: DonationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
    this.getUnities();
    this.getLoadDonation();
  }

  private getLoadDonation() {
    if (this.data.donate) {
      this.unidade = this.data.donate.unidade;
      this.form.patchValue(this.data.donate);
      this.isDonationDefault = false;
      this.availability = this.data.donate.disponibilidade;
      this.entidadeId = this.data.donate.entidadeId;
    }
    else {
      this.form.patchValue(this.donation);
      this.unidade = this.donation.unidade;
      this.availability = this.data.disponibilidade;
      this.entidadeId = this.donation.entidadeId;
    }
  }

  validation() {
    this.form = this.formBuilder.group({
      id: [],
      materialDoado: [],
      preco: [],
      estoque: [],
      destino: [],
      dtEntrada: [],
      entidadeId: [],
      unidade: [],
      dtRetirada: [],
      retiradaPor: [],
      segunda: [false],
      terca: [false],
      quarta: [false],
      quinta: [false],
      sexta: [false],
      turno: []
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  send(): void {
    this.spinner.show();

    if (!this.isDonationDefault)
      this.form.controls['entidadeId'].setValue(this.data.voluntaryId ? this.data.voluntaryId : this.data.donate.entidadeId);

    this.donationService.updateDonation(this.form.value).subscribe({
      next: (donation: Donation) => {
        if (this.isDonationDefault)
          this.donationUpdated.emit(donation);
        else
          window.location.reload();
      },
      error: () => {
        this.toastr.error('Não foi possível alterar doação');
      },
    }).add(() => this.spinner.hide());
  }

  getUnities(): void {
    this.donationService.getUnties().subscribe({
      next: (unities: string[]) => {
        this.unities = unities;
      },
      error: () => {
        this.toastr.error('Erro ao carregar unidades');
      }
    })
  }
}
