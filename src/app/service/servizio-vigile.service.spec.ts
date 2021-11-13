import { TestBed } from '@angular/core/testing';

import { ServizioVigileService } from './servizio-vigile.service';

describe('ServizioVigileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServizioVigileService = TestBed.get(ServizioVigileService);
    expect(service).toBeTruthy();
  });
});
