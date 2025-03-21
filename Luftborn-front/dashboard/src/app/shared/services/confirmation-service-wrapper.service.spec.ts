import { TestBed } from '@angular/core/testing';

import { ConfirmationServiceWrapperService } from './confirmation-service-wrapper.service';

describe('ConfirmationServiceWrapperService', () => {
  let service: ConfirmationServiceWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationServiceWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
