import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoluntaryComponent } from './list-voluntary.component';

describe('ListVoluntaryComponent', () => {
  let component: ListVoluntaryComponent;
  let fixture: ComponentFixture<ListVoluntaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVoluntaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVoluntaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
