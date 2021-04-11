import { TestBed } from '@angular/core/testing';

import { TemasPresentacionesService } from './temas-presentaciones.service';

describe('TemasPresentacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemasPresentacionesService = TestBed.get(TemasPresentacionesService);
    expect(service).toBeTruthy();
  });
});
