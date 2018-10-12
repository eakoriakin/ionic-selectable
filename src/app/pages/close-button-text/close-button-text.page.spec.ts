import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseButtonTextPage } from './close-button-text.page';

describe('CloseButtonTextPage', () => {
  let component: CloseButtonTextPage;
  let fixture: ComponentFixture<CloseButtonTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloseButtonTextPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseButtonTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
