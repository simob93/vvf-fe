import { TestBed } from '@angular/core/testing';

import { ProtocolliServiceService } from './protocolli-service.service';

describe('ProtocolliServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProtocolliServiceService = TestBed.get(ProtocolliServiceService);
    expect(service).toBeTruthy();
  });
});
