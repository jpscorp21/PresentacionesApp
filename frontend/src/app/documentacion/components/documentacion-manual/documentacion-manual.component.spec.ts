import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacionManualComponent } from './documentacion-manual.component';

describe('DocumentacionManualComponent', () => {
  let component: DocumentacionManualComponent;
  let fixture: ComponentFixture<DocumentacionManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentacionManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentacionManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
