import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentacionesFavoritosComponent } from './presentaciones-favoritos.component';

describe('PresentacionesFavoritosComponent', () => {
  let component: PresentacionesFavoritosComponent;
  let fixture: ComponentFixture<PresentacionesFavoritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionesFavoritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentacionesFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
