import { TestBed } from '@angular/core/testing';

import { VigilePatentiService } from './vigile-patenti.service';

describe('VigilePatentiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VigilePatentiService = TestBed.get(VigilePatentiService);
    expect(service).toBeTruthy();
  });
});
