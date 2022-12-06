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
  styleUrls: ['./voluntary-detail.component.scss']
})
export class VoluntaryDetailComponent implements OnInit {

  voluntaryId!: number;
  voluntary: Voluntary = {} as Voluntary;
  panelOpenState = false;

  constructor(private route: ActivatedRoute,
              private voluntaryService: VoluntaryService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.voluntaryId = +this.route.snapshot.params['id'];
    this.getVoluntaryById();
  }

  getVoluntaryById(): void {
    this.spinner.show();

    this.voluntaryService.getVoluntaryById(this.voluntaryId).subscribe({
      next: (voluntary: Voluntary) => {
        this.voluntary = voluntary;
      },
      error: () => {
        this.toastr.error('Erro ao carregar voluntário');
      }
    }).add(() => this.spinner.hide());
  }

  onChangeDonations(donations: Donation[]){
    this.voluntary.doacoes = donations;
  }

  openDialog(donation: Donation) {
    this.dialog.open(DonationDetailComponent, { data: { donate: donation, voluntaryId: this.voluntaryId }});
  }
}
