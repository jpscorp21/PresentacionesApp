import { TestBed } from '@angular/core/testing';

import { PresentacionesService } from './presentaciones.service';

describe('PresentacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentacionesService = TestBed.get(PresentacionesService);
    expect(service).toBeTruthy();
  });
});
