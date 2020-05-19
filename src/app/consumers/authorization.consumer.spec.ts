import { TestBed } from '@angular/core/testing';

import { AuthorizationConsumer } from './authorization.consumer';

describe('AuthorizationConsumer', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationConsumer = TestBed.get(AuthorizationConsumer);
    expect(service).toBeTruthy();
  });
});
