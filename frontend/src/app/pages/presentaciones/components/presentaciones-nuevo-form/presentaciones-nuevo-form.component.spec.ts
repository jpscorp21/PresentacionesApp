import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesNuevoFormComponent } from './presentaciones-nuevo-form.component';

describe('PresentacionesNuevoFormComponent', () => {
  let component: PresentacionesNuevoFormComponent;
  let fixture: ComponentFixture<PresentacionesNuevoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesNuevoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesNuevoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
