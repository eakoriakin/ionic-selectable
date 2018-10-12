import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueTemplatePage } from './value-template.page';

describe('ValueTemplatePage', () => {
  let component: ValueTemplatePage;
  let fixture: ComponentFixture<ValueTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValueTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
