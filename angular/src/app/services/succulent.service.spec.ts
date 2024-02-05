import { TestBed } from '@angular/core/testing';

import { SucculentService } from './succulent.service';

describe('SucculentService', () => {
  let service: SucculentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucculentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
