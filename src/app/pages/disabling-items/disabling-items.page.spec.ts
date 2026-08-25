import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DisablingItemsPage } from './disabling-items.page';

describe('DisablingItemsPage', () => {
  let component: DisablingItemsPage;
  let fixture: ComponentFixture<DisablingItemsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DisablingItemsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisablingItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
