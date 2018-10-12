import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleValuesTemplatePage } from './multiple-values-template.page';

describe('MultipleValuesTemplatePage', () => {
  let component: MultipleValuesTemplatePage;
  let fixture: ComponentFixture<MultipleValuesTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleValuesTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleValuesTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
