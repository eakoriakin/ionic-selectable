import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditingAsyncPage } from './editing-async.page';

describe('EditingAsyncPage', () => {
  let component: EditingAsyncPage;
  let fixture: ComponentFixture<EditingAsyncPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditingAsyncPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingAsyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
