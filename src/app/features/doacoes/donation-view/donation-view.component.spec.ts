import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationViewComponent } from './donation-view.component';

describe('DonationViewComponent', () => {
  let component: DonationViewComponent;
  let fixture: ComponentFixture<DonationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
