import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MinMaxSelectionPage } from './min-max-selection.page';

describe('MinMaxSelectionPage', () => {
  let component: MinMaxSelectionPage;
  let fixture: ComponentFixture<MinMaxSelectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MinMaxSelectionPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinMaxSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
