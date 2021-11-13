import { TestBed } from '@angular/core/testing';

import { ScadenzeService } from './scadenze.service';

describe('ScadenzeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScadenzeService = TestBed.get(ScadenzeService);
    expect(service).toBeTruthy();
  });
});
