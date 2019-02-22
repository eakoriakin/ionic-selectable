import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupEndTemplatePage } from './group-end-template.page';

describe('GroupEndTemplatePage', () => {
  let component: GroupEndTemplatePage;
  let fixture: ComponentFixture<GroupEndTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupEndTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEndTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
