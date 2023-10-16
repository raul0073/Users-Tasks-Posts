import { TestBed } from '@angular/core/testing';

import { UserBoxSelectedService } from './user-box-selected.service';

describe('UserBoxSelectedService', () => {
  let service: UserBoxSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBoxSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
