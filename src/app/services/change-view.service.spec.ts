import { TestBed } from '@angular/core/testing';

import { ChangeViewService } from './change-view.service';

describe('ChangeViewService', () => {
  let service: ChangeViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
