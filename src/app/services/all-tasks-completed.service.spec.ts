import { TestBed } from '@angular/core/testing';

import { AllTasksCompletedService } from './all-tasks-completed.service';

describe('AllTasksCompletedService', () => {
  let service: AllTasksCompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTasksCompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
