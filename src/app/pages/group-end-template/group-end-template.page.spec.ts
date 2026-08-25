import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GroupEndTemplatePage } from './group-end-template.page';

describe('GroupEndTemplatePage', () => {
  let component: GroupEndTemplatePage;
  let fixture: ComponentFixture<GroupEndTemplatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GroupEndTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
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
