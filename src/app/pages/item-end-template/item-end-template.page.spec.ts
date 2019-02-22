import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemEndTemplatePage } from './item-end-template.page';

describe('ItemEndTemplatePage', () => {
  let component: ItemEndTemplatePage;
  let fixture: ComponentFixture<ItemEndTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEndTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEndTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
