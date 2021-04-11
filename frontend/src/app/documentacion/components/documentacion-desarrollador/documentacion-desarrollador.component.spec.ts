import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionDesarrolladorComponent } from './documentacion-desarrollador.component';

describe('DocumentacionDesarrolladorComponent', () => {
  let component: DocumentacionDesarrolladorComponent;
  let fixture: ComponentFixture<DocumentacionDesarrolladorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionDesarrolladorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionDesarrolladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
