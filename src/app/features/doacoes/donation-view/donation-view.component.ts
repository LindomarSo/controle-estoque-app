import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonationDetailComponent } from '../donation-detail/donation-detail.component';

@Component({
  selector: 'app-donation-view',
  templateUrl: './donation-view.component.html',
  styleUrls: ['./donation-view.component.scss']
})
export class DonationViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getDate(date: string): string {
    let data = date.substring(0, 10);
    let dateArray = data.split('-');

    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  }

  editDonation(): void {
    this.dialog.open(DonationDetailComponent, { data: this.data });
  }
}
