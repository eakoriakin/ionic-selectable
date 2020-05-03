import { EventEmitter, ChangeDetectorRef, ElementRef, NgZone, Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { proxyOutputs, ProxyCmp } from './proxies-utils';
import { Components } from 'test-isc';
import { IonicSelectableItemTemplateDirective } from './directives/ionic-selectable-item-template.directive';
export declare interface IonicSelectable extends Components.IonicSelectable {}
@ProxyCmp({
  inputs: [
    'isOpened',
    'isDisabled',
    'placeholder',
    'closeButtonText',
    'closeButtonSlot',
    'itemIconSlot',
    'confirmButtonText',
    'clearButtonText',
    'addButtonText',
    'name',
    'selectedText',
    'isMultiple',
    'value',
    'shouldStoreItemValue',
    'items',
    'disabledItems',
    'itemValueField',
    'itemTextField',
    'shouldBackdropClose',
    'modalCssClass',
    'modalEnterAnimation',
    'modalLeaveAnimation',
    'titleText',
    'groupValueField',
    'groupTextField',
    'hasInfiniteScroll',
    'infiniteScrollThreshold',
    'hasVirtualScroll',
    'virtualScrollApproxHeaderHeight',
    'virtualScrollApproxItemHeight',
    'hasConfirmButton',
    'canAddItem',
    'canClear',
    'canSearch',
    'shouldDelegateSearchToEvent',
    'searchDebounce',
    'searchPlaceholder',
    'searchText',
    'shouldFocusSearchbar',
    'hasSearchText',
    'searchCancelButtonIcon',
    'searchCancelButtonText',
    'searchClearIcon',
    'searchInputmode',
    'searchIcon',
    'searchShowCancelButton',
    'isConfirmButtonEnabled',
    'headerColor',
    'groupColor',
    'virtualScrollHeaderFn',
  ],
  methods: [
    'hasValue',
    'open',
    'close',
    'getItemsToConfirm',
    'confirm',
    'clear',
    'enableInfiniteScroll',
    'disableInfiniteScroll',
    'endInfiniteScroll',
    'scrollToTop',
    'scrollToBottom',
    'startSearch',
    'endSearch',
    'showLoading',
    'hideLoading',
    'addItem',
    'deleteItem',
    'toggleItems',
  ],
})
@Component({
  selector: 'ionic-selectable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'isOpened',
    'isDisabled',
    'placeholder',
    'closeButtonText',
    'closeButtonSlot',
    'itemIconSlot',
    'confirmButtonText',
    'clearButtonText',
    'addButtonText',
    'name',
    'selectedText',
    'isMultiple',
    'value',
    'shouldStoreItemValue',
    'items',
    'disabledItems',
    'itemValueField',
    'itemTextField',
    'shouldBackdropClose',
    'modalCssClass',
    'modalEnterAnimation',
    'modalLeaveAnimation',
    'titleText',
    'groupValueField',
    'groupTextField',
    'hasInfiniteScroll',
    'infiniteScrollThreshold',
    'hasVirtualScroll',
    'virtualScrollApproxHeaderHeight',
    'virtualScrollApproxItemHeight',
    'hasConfirmButton',
    'canAddItem',
    'canClear',
    'canSearch',
    'shouldDelegateSearchToEvent',
    'searchDebounce',
    'searchPlaceholder',
    'searchText',
    'shouldFocusSearchbar',
    'hasSearchText',
    'searchCancelButtonIcon',
    'searchCancelButtonText',
    'searchClearIcon',
    'searchInputmode',
    'searchIcon',
    'searchShowCancelButton',
    'isConfirmButtonEnabled',
    'headerColor',
    'groupColor',
    'virtualScrollHeaderFn',
  ],
})
export class IonicSelectable {
  infiniteScrolled!: EventEmitter<CustomEvent>;
  searching!: EventEmitter<CustomEvent>;
  searchFailed!: EventEmitter<CustomEvent>;
  searchSuccessed!: EventEmitter<CustomEvent>;
  itemAdding!: EventEmitter<CustomEvent>;
  cleared!: EventEmitter<CustomEvent>;
  changed!: EventEmitter<CustomEvent>;
  itemsChanged!: EventEmitter<CustomEvent>;
  selected!: EventEmitter<CustomEvent>;
  opened!: EventEmitter<CustomEvent>;
  closed!: EventEmitter<CustomEvent>;
  focused!: EventEmitter<CustomEvent>;
  blurred!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;

  @ContentChild(IonicSelectableItemTemplateDirective, { static: false }) IonicSelectableItemTemplateDirectiveTmp!: IonicSelectableItemTemplateDirective;
  
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, [
      'infiniteScrolled',
      'searching',
      'searchFailed',
      'searchSuccessed',
      'itemAdding',
      'cleared',
      'changed',
      'itemsChanged',
      'selected',
      'opened',
      'closed',
      'focused',
      'blurred',
    ]);
  }
}
