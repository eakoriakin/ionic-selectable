import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialValuePage } from './initial-value.page';

describe('InitialValuePage', () => {
  let component: InitialValuePage;
  let fixture: ComponentFixture<InitialValuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InitialValuePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialValuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
