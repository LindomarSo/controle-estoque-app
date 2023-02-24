import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import {
  DonationModalComponent,
  Category,
} from '../donation-modal/donation-modal.component';

@Component({
  selector: 'app-donation-updates',
  templateUrl: './donation-updates.component.html',
  styleUrls: ['./donation-updates.component.scss'],
})
export class DonationUpdatesComponent {
  public donationForm: FormGroup = new FormGroup({});
  public donationLoaded: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DonationModalComponent>,
    private donationService: DonationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.donationLoaded = this.data.donate;

    this.donationForm = new FormGroup({
      id: new FormControl(0),
      tipo: new FormControl('', Validators.required),
      data: new FormControl(new Date(), Validators.required),
      retiradoPor: new FormControl('', Validators.required),
      quantidade: new FormControl(0, Validators.pattern('^[0-9]*$')),
    });
  }

  sendDonationUpdate() {
    this.spinner.show();

    let formValue = this.donationForm.getRawValue();

    let updateDonation = {
      doacaoId: this.donationLoaded.id,
      quantidade: formValue['quantidade'],
      tipo: formValue['tipo'].toLowerCase(),
      retiradoPor: formValue['retiradoPor'],
      dataRetirada: formValue['data'],
    };

    console.log('Donation Log: ', updateDonation);

    this.donationService
      .createUpdateDonation(updateDonation)
      .subscribe({
        next: () => {
          this.toastr.success('Doação atualizada com sucesso!');
        },
        error: () => {
          this.toastr.error('Erro ao atualizar doação.', 'Erro');
        },
        complete: () => {
          this.dialogRef.close();
          window.location.reload();
        },
      })
      .add(() => {
        this.spinner.hide();
      });

    // this.toastr.warning('Falta implementar as atualizações', 'Implementar');
  }
}
