import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingPage } from './editing.page';

describe('EditingPage', () => {
  let component: EditingPage;
  let fixture: ComponentFixture<EditingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditingPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
