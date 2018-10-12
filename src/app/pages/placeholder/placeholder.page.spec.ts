import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceholderPage } from './placeholder.page';

describe('PlaceholderPage', () => {
  let component: PlaceholderPage;
  let fixture: ComponentFixture<PlaceholderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceholderPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
