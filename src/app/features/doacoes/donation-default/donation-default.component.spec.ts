import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDefaultComponent } from './donation-default.component';

describe('DonationDefaultComponent', () => {
  let component: DonationDefaultComponent;
  let fixture: ComponentFixture<DonationDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
