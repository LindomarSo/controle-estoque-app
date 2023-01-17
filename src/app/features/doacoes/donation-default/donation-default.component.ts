import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-donation-default',
  templateUrl: './donation-default.component.html',
  styleUrls: ['./donation-default.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class DonationDefaultComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit(): void {
  }

  onDonationUpdated(donation: Donation): void {
    window.location.reload();
  }
}
