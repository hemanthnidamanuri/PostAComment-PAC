import { TestBed, inject } from '@angular/core/testing';

import { WritepostService } from './writepost.service';

describe('WritepostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WritepostService]
    });
  });

  it('should be created', inject([WritepostService], (service: WritepostService) => {
    expect(service).toBeTruthy();
  }));
});
