import { TestBed } from '@angular/core/testing';

import { IkmService } from './ikm.service';

describe('IkmService', () => {
  let service: IkmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IkmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
