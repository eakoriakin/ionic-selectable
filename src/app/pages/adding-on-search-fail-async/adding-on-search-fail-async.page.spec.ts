import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddingOnSearchFailAsyncPage } from './adding-on-search-fail-async.page';

describe('AddingOnSearchFailAsyncPage', () => {
  let component: AddingOnSearchFailAsyncPage;
  let fixture: ComponentFixture<AddingOnSearchFailAsyncPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddingOnSearchFailAsyncPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingOnSearchFailAsyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
