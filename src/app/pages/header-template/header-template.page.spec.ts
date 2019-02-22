import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderTemplatePage } from './header-template.page';

describe('HeaderTemplatePage', () => {
  let component: HeaderTemplatePage;
  let fixture: ComponentFixture<HeaderTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
