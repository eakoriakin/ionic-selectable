import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingAsyncPage } from './editing-async.page';

describe('EditingAsyncPage', () => {
  let component: EditingAsyncPage;
  let fixture: ComponentFixture<EditingAsyncPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditingAsyncPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingAsyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
