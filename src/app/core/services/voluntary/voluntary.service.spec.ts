import { TestBed } from '@angular/core/testing';

import { VoluntaryService } from './voluntary.service';

describe('VoluntaryService', () => {
  let service: VoluntaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoluntaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
