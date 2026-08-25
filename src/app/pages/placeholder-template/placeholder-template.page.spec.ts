import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlaceholderTemplatePage } from './placeholder-template.page';

describe('PlaceholderTemplatePage', () => {
  let component: PlaceholderTemplatePage;
  let fixture: ComponentFixture<PlaceholderTemplatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaceholderTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
