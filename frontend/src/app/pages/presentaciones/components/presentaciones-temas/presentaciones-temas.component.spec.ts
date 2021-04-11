import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesTemasComponent } from './presentaciones-temas.component';

describe('PresentacionesTemasComponent', () => {
  let component: PresentacionesTemasComponent;
  let fixture: ComponentFixture<PresentacionesTemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesTemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
