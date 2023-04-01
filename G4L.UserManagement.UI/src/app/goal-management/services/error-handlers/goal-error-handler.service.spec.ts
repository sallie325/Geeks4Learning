import { TestBed } from '@angular/core/testing';

import { GoalErrorHandlerService } from './goal-error-handler.service';

describe('GoalErrorHandlerService', () => {
  let service: GoalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
