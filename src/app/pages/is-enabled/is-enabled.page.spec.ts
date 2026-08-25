import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IsEnabledPage } from './is-enabled.page';

describe('IsEnabledPage', () => {
  let component: IsEnabledPage;
  let fixture: ComponentFixture<IsEnabledPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IsEnabledPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsEnabledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
