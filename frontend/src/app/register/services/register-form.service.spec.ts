import { TestBed } from '@angular/core/testing';

import { RegisterFormService } from './register-form.service';

describe('RegisterFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterFormService = TestBed.get(RegisterFormService);
    expect(service).toBeTruthy();
  });
});
