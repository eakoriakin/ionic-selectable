import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FindPortsPage } from './find-ports.page';

describe('FindPortsPage', () => {
  let component: FindPortsPage;
  let fixture: ComponentFixture<FindPortsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FindPortsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPortsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
