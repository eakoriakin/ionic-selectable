import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToTopPage } from './scroll-to-top.page';

describe('ScrollToTopPage', () => {
  let component: ScrollToTopPage;
  let fixture: ComponentFixture<ScrollToTopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollToTopPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
