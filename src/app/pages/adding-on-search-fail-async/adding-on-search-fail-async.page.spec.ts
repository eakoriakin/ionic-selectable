import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddingOnSearchFailAsyncPage } from './adding-on-search-fail-async.page';

describe('AddingOnSearchFailAsyncPage', () => {
  let component: AddingOnSearchFailAsyncPage;
  let fixture: ComponentFixture<AddingOnSearchFailAsyncPage>;

  beforeEach(waitForAsync(() => {
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
