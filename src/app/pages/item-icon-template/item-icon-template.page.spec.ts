import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemIconTemplatePage } from './item-icon-template.page';

describe('ItemIconTemplatePage', () => {
  let component: ItemIconTemplatePage;
  let fixture: ComponentFixture<ItemIconTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemIconTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemIconTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
