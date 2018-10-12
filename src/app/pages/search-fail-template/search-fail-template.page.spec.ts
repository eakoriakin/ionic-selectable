import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFailTemplatePage } from './search-fail-template.page';

describe('SearchFailTemplatePage', () => {
  let component: SearchFailTemplatePage;
  let fixture: ComponentFixture<SearchFailTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFailTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFailTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
