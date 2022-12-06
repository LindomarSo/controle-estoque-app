import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private donationService: DonationService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
    this.form.patchValue(this.data.donate);
  }

  validation() {
    this.form = this.formBuilder.group({
      id: [],
      materialDoado: [],
      preco: [],
      quantidade: [],
      destino: [],
      dtEntrada: [],
      entidadeId: [this.data.entidadeId],
      unidade: [],
      dtRetirada: [],
      retiradaPor: [],
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  send(): void {
    this.spinner.show();

    this.form.controls['entidadeId'].setValue(this.data.voluntaryId);

    this.donationService.updateDonation(this.form.value).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        this.toastr.error('Não foi possível alterar doação');
       },
    }).add(() => this.spinner.hide());
  }
}
