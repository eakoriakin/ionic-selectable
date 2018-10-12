import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsideModalPage } from './inside-modal.page';

describe('InsideModalPage', () => {
  let component: InsideModalPage;
  let fixture: ComponentFixture<InsideModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsideModalPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
