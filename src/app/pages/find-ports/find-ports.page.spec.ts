import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FindPortsPage } from './find-ports.page';

describe('FindPortsPage', () => {
  let component: FindPortsPage;
  let fixture: ComponentFixture<FindPortsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindPortsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPortsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
