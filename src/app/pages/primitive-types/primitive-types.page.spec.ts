import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimitiveTypesPage } from './primitive-types.page';

describe('PrimitiveTypesPage', () => {
  let component: PrimitiveTypesPage;
  let fixture: ComponentFixture<PrimitiveTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrimitiveTypesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimitiveTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
