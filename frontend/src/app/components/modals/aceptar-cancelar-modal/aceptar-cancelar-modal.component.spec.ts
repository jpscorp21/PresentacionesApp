import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarCancelarModalComponent } from './aceptar-cancelar-modal.component';

describe('AceptarCancelarModalComponent', () => {
  let component: AceptarCancelarModalComponent;
  let fixture: ComponentFixture<AceptarCancelarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarCancelarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarCancelarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
