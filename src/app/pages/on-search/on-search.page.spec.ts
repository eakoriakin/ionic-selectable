import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OnSearchPage } from './on-search.page';

describe('OnSearchPage', () => {
  let component: OnSearchPage;
  let fixture: ComponentFixture<OnSearchPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OnSearchPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
