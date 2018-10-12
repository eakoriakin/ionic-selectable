import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceholderTemplatePage } from './placeholder-template.page';

describe('PlaceholderTemplatePage', () => {
  let component: PlaceholderTemplatePage;
  let fixture: ComponentFixture<PlaceholderTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
