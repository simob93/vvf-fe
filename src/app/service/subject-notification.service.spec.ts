import { TestBed } from '@angular/core/testing';

import { SubjectNotificationService } from './subject-notification.service';

describe('SubjectNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectNotificationService = TestBed.get(SubjectNotificationService);
    expect(service).toBeTruthy();
  });
});
