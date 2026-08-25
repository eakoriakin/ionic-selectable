import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VirtualScrollPage } from './virtual-scroll.page';

describe('VirtualScrollPage', () => {
  let component: VirtualScrollPage;
  let fixture: ComponentFixture<VirtualScrollPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VirtualScrollPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
