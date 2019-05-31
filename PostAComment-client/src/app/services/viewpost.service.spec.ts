import { TestBed, inject } from '@angular/core/testing';

import { ViewpostService } from './viewpost.service';

describe('ViewpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewpostService]
    });
  });

  it('should be created', inject([ViewpostService], (service: ViewpostService) => {
    expect(service).toBeTruthy();
  }));
});
