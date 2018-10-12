import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValuesEllipsisTemplatePage } from './values-ellipsis-template.page';

describe('ValuesEllipsisTemplatePage', () => {
  let component: ValuesEllipsisTemplatePage;
  let fixture: ComponentFixture<ValuesEllipsisTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValuesEllipsisTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesEllipsisTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
