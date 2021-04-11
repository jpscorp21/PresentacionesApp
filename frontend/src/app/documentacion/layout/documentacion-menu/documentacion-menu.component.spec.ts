import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionMenuComponent } from './documentacion-menu.component';

describe('DocumentacionMenuComponent', () => {
  let component: DocumentacionMenuComponent;
  let fixture: ComponentFixture<DocumentacionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
