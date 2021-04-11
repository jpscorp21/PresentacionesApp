import { TestBed } from '@angular/core/testing';

import { ValidacionesMensajeService } from './validaciones-mensaje.service';

describe('ValidacionesMensajeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacionesMensajeService = TestBed.get(ValidacionesMensajeService);
    expect(service).toBeTruthy();
  });
});
