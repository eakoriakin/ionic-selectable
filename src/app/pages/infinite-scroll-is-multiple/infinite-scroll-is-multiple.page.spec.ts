import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InfiniteScrollIsMultiplePage } from './infinite-scroll-is-multiple.page';

describe('InfiniteScrollIsMultiplePage', () => {
  let component: InfiniteScrollIsMultiplePage;
  let fixture: ComponentFixture<InfiniteScrollIsMultiplePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollIsMultiplePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollIsMultiplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
