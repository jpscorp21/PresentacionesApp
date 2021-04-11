import { TestBed } from '@angular/core/testing';

import { PresentacionesFormatoService } from './presentaciones-formato.service';

describe('PresentacionesFormatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentacionesFormatoService = TestBed.get(PresentacionesFormatoService);
    expect(service).toBeTruthy();
  });
});
