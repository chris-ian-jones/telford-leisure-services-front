/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountRecoveryService } from './account-recovery.service';

describe('Service: AccountRecovery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountRecoveryService]
    });
  });

  it('should ...', inject([AccountRecoveryService], (service: AccountRecoveryService) => {
    expect(service).toBeTruthy();
  }));
});
