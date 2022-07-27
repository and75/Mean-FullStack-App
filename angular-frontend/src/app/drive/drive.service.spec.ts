import { TestBed } from '@angular/core/testing';

import { DriveService } from './drive.service';

describe('DriveServiceService', () => {
  let service: DriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
