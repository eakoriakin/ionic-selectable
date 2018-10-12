import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupingVirtualScrollPage } from './grouping-virtual-scroll.page';

describe('GroupingVirtualScrollPage', () => {
  let component: GroupingVirtualScrollPage;
  let fixture: ComponentFixture<GroupingVirtualScrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupingVirtualScrollPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingVirtualScrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
