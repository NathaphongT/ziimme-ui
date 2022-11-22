import { TestBed, inject } from '@angular/core/testing';

import { FuncService } from './func.service';

describe('FuncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncService]
    });
  });

  it('should be created', inject([FuncService], (service: FuncService) => {
    expect(service).toBeTruthy();
  }));
});
