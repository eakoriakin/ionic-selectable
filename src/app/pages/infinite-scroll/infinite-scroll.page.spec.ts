import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InfiniteScrollPage } from './infinite-scroll.page';

describe('InfiniteScrollPage', () => {
  let component: InfiniteScrollPage;
  let fixture: ComponentFixture<InfiniteScrollPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InfiniteScrollPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
