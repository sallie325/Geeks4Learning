import { TestBed } from '@angular/core/testing';

import { GoalManagementService } from './goal-management.service';

describe('GoalManagementService', () => {
  let service: GoalManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
