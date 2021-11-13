import { TestBed } from '@angular/core/testing';

import { VigileService } from './vigile.service';

describe('VigileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VigileService = TestBed.get(VigileService);
    expect(service).toBeTruthy();
  });
});
