import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShouldStoreItemValuePage } from './should-store-item-value.page';

describe('ShouldStoreItemValuePage', () => {
  let component: ShouldStoreItemValuePage;
  let fixture: ComponentFixture<ShouldStoreItemValuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShouldStoreItemValuePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
