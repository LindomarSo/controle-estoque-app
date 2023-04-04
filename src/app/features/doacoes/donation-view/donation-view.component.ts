import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';
import { DonationUpdatesComponent } from '../donation-updates/donation-updates.component';

@Component({
  selector: 'app-donation-view',
  templateUrl: './donation-view.component.html',
  styleUrls: ['./donation-view.component.scss'],
})
export class DonationViewComponent {
  dataSource: any;
  displayedColumns: string[] = [
    'tipo',
    'quantidade',
    'data',
    'responsavel',
    'cadastrado',
  ];
  donationId!: number;
  donation: any;

  expanded = false;

  constructor(
    private route: ActivatedRoute,
    private donationService: DonationService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.donationId = this.route.snapshot.params['id'];
    this.getDonationById();
  }

  getDonationById(): void {
    this.spinner.show();

    this.donationService
      .getDonationById(this.donationId)
      .subscribe({
        next: (donation: any) => {
          this.donation = donation;
          this.dataSource = donation.doacoesRetiradas;
        },
        error: () => {
          this.toastr.error('Erro ao carregar voluntário');
        },
      })
      .add(() => this.spinner.hide());
  }

  openDonate() {
    this.dialog.open(DonationModalComponent, {
      data: { donate: this.donation, donator: this.donation.entidade },
    });
  }

  openUpdateModal() {
    this.dialog.open(DonationUpdatesComponent, {
      data: { donate: this.donation, donator: this.donation.entidade },
    });
  }

  seeNewAction() {
    if (
      this.donation.categoria.nome !== 'Dinheiro' &&
      this.donation.categoria.nome !== 'Serviços'
    ) {
      return true;
    }

    this.expanded = true;
    return false;
  }

  seeAvailability() {
    if (this.donation.categoria.nome == 'Serviços') {
      return true;
    }

    return false;
  }
}
