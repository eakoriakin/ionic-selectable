import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupingPage } from './grouping.page';

describe('GroupingPage', () => {
  let component: GroupingPage;
  let fixture: ComponentFixture<GroupingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupingPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
