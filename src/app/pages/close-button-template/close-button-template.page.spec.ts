import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseButtonTemplatePage } from './close-button-template.page';


describe('CloseButtonTemplatePage', () => {
  let component: CloseButtonTemplatePage;
  let fixture: ComponentFixture<CloseButtonTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloseButtonTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseButtonTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
