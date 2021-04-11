import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionIntroduccionComponent } from './documentacion-introduccion.component';

describe('DocumentacionIntroduccionComponent', () => {
  let component: DocumentacionIntroduccionComponent;
  let fixture: ComponentFixture<DocumentacionIntroduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionIntroduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionIntroduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
