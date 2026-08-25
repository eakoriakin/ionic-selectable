import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CloseButtonTextPage } from './close-button-text.page';

describe('CloseButtonTextPage', () => {
  let component: CloseButtonTextPage;
  let fixture: ComponentFixture<CloseButtonTextPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CloseButtonTextPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseButtonTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
