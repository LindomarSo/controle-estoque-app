import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonLegalComponent } from './create-person-legal.component';

describe('CreatePersonLegalComponent', () => {
  let component: CreatePersonLegalComponent;
  let fixture: ComponentFixture<CreatePersonLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonLegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePersonLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
