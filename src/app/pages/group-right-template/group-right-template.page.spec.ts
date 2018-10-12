import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupRightTemplatePage } from './group-right-template.page';

describe('GroupRightTemplatePage', () => {
  let component: GroupRightTemplatePage;
  let fixture: ComponentFixture<GroupRightTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRightTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRightTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
