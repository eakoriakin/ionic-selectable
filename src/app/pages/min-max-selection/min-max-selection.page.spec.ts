import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinMaxSelectionPage } from './min-max-selection.page';

describe('MinMaxSelectionPage', () => {
  let component: MinMaxSelectionPage;
  let fixture: ComponentFixture<MinMaxSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinMaxSelectionPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
