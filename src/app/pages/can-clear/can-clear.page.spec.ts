import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanClearPage } from './can-clear.page';

describe('CanClearPage', () => {
  let component: CanClearPage;
  let fixture: ComponentFixture<CanClearPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [CanClearPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanClearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
