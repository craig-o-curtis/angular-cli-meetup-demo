import { TestBed, inject } from '@angular/core/testing';

import { ReposService } from './repos.service';

describe('ReposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReposService]
    });
  });

  it('should be created', inject([ReposService], (service: ReposService) => {
    expect(service).toBeTruthy();
  }));
});
