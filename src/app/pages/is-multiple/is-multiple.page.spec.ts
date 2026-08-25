import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IsMultiplePage } from './is-multiple.page';

describe('IsMultiplePage', () => {
  let component: IsMultiplePage;
  let fixture: ComponentFixture<IsMultiplePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IsMultiplePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsMultiplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
