import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FooterTemplatePage } from './footer-template.page';

describe('FooterTemplatePage', () => {
  let component: FooterTemplatePage;
  let fixture: ComponentFixture<FooterTemplatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FooterTemplatePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
