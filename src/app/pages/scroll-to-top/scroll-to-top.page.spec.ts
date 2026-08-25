import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScrollToTopPage } from './scroll-to-top.page';

describe('ScrollToTopPage', () => {
  let component: ScrollToTopPage;
  let fixture: ComponentFixture<ScrollToTopPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ScrollToTopPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
