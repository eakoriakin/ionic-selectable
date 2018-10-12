import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IsEnabledPage } from './is-enabled.page';

describe('IsEnabledPage', () => {
  let component: IsEnabledPage;
  let fixture: ComponentFixture<IsEnabledPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsEnabledPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsEnabledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
