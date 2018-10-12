import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemTemplatePage } from './item-template.page';

describe('ItemTemplatePage', () => {
  let component: ItemTemplatePage;
  let fixture: ComponentFixture<ItemTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
