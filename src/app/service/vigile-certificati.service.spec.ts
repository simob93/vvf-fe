import { TestBed } from '@angular/core/testing';

import { VigileCertificatiService } from './vigile-certificati.service';

describe('VigileCertificatiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VigileCertificatiService = TestBed.get(VigileCertificatiService);
    expect(service).toBeTruthy();
  });
});
