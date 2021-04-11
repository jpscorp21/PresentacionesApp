import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesListaComponent } from './presentaciones-lista.component';

describe('PresentacionesListaComponent', () => {
  let component: PresentacionesListaComponent;
  let fixture: ComponentFixture<PresentacionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
