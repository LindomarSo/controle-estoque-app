import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoluntaryComponent } from './create-voluntary.component';

describe('CreateVoluntaryComponent', () => {
  let component: CreateVoluntaryComponent;
  let fixture: ComponentFixture<CreateVoluntaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVoluntaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVoluntaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
