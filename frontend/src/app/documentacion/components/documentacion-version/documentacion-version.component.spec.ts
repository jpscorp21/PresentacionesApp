import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionVersionComponent } from './documentacion-version.component';

describe('DocumentacionVersionComponent', () => {
  let component: DocumentacionVersionComponent;
  let fixture: ComponentFixture<DocumentacionVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
