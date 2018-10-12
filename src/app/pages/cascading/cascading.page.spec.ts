import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CascadingPage } from './cascading.page';

describe('CascadingPage', () => {
  let component: CascadingPage;
  let fixture: ComponentFixture<CascadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CascadingPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CascadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
