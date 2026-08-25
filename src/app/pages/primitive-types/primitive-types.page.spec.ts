import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrimitiveTypesPage } from './primitive-types.page';

describe('PrimitiveTypesPage', () => {
  let component: PrimitiveTypesPage;
  let fixture: ComponentFixture<PrimitiveTypesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PrimitiveTypesPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideIonicAngular()],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimitiveTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
