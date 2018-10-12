import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleTemplatePage } from './title-template.page';

describe('TitleTemplatePage', () => {
  let component: TitleTemplatePage;
  let fixture: ComponentFixture<TitleTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
