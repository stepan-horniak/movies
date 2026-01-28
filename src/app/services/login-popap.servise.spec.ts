import { TestBed } from '@angular/core/testing';

import { LoginPopapServise } from './login-popap.servise';

describe('LoginPopapServise', () => {
  let service: LoginPopapServise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPopapServise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
