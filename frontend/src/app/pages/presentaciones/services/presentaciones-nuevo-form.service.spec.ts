import { TestBed } from '@angular/core/testing';

import { PresentacionesNuevoFormService } from './presentaciones-nuevo-form.service';

describe('PresentacionesNuevoFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentacionesNuevoFormService = TestBed.get(PresentacionesNuevoFormService);
    expect(service).toBeTruthy();
  });
});
