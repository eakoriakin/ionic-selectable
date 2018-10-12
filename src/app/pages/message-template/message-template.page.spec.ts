import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageTemplatePage } from './message-template.page';

describe('MessageTemplatePage', () => {
  let component: MessageTemplatePage;
  let fixture: ComponentFixture<MessageTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
