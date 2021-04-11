import { TestBed } from '@angular/core/testing';

import { PerfilFormService } from './perfil-form.service';

describe('PerfilFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfilFormService = TestBed.get(PerfilFormService);
    expect(service).toBeTruthy();
  });
});
