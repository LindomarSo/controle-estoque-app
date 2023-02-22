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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DonationModalComponent>,
    private donationService: DonationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.donationForm = new FormGroup({
      id: new FormControl(0),
      tipo: new FormControl('', Validators.required),
      data: new FormControl(new Date(), Validators.required),
      retiradoPor: new FormControl(new Date(), Validators.required),
    });
  }

  sendDonationUpdate() {
    this.dialogRef.close();

    this.toastr.warning(
      'Falta implementar as atualizações',
      'Implementar'
    );
  }
}
