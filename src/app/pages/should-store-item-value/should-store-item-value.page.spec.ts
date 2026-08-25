import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShouldStoreItemValuePage } from './should-store-item-value.page';

describe('ShouldStoreItemValuePage', () => {
  let component: ShouldStoreItemValuePage;
  let fixture: ComponentFixture<ShouldStoreItemValuePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShouldStoreItemValuePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShouldStoreItemValuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
