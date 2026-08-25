import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InsideModalPage } from './inside-modal.page';

describe('InsideModalPage', () => {
  let component: InsideModalPage;
  let fixture: ComponentFixture<InsideModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InsideModalPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
