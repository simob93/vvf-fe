import { TestBed } from '@angular/core/testing';

import { PortletService } from './portlet.service';

describe('PortletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortletService = TestBed.get(PortletService);
    expect(service).toBeTruthy();
  });
});
