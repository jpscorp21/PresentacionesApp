import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesDetalleComponent } from './presentaciones-detalle.component';

describe('PresentacionesDetalleComponent', () => {
  let component: PresentacionesDetalleComponent;
  let fixture: ComponentFixture<PresentacionesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
