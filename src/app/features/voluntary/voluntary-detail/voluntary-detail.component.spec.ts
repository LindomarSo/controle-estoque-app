import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryDetailComponent } from './voluntary-detail.component';

describe('VoluntaryDetailComponent', () => {
  let component: VoluntaryDetailComponent;
  let fixture: ComponentFixture<VoluntaryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntaryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
