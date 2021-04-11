import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionFuncionamientoComponent } from './documentacion-funcionamiento.component';

describe('DocumentacionFuncionamientoComponent', () => {
  let component: DocumentacionFuncionamientoComponent;
  let fixture: ComponentFixture<DocumentacionFuncionamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionFuncionamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionFuncionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
