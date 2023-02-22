import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUpdatesComponent } from './donation-updates.component';

describe('DonationUpdatesComponent', () => {
  let component: DonationUpdatesComponent;
  let fixture: ComponentFixture<DonationUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
