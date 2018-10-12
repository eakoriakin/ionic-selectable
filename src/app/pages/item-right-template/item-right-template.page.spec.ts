import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemRightTemplatePage } from './item-right-template.page';

describe('ItemRightTemplatePage', () => {
  let component: ItemRightTemplatePage;
  let fixture: ComponentFixture<ItemRightTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemRightTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRightTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
