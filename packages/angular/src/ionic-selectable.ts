import { EventEmitter, ChangeDetectorRef, ElementRef, NgZone, Component, ChangeDetectionStrategy } from '@angular/core';
import { proxyOutputs, ProxyCmp } from './proxies-utils';
import { Components } from 'test-isc';
import { IIonicSelectableEvent } from 'test-isc/dist/types/components/ionic-selectable/ionic-selectable.interfaces.component';
export { IIonicSelectableEvent } from 'test-isc/dist/types/components/ionic-selectable/ionic-selectable.interfaces.component';
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
  infiniteScroll!: EventEmitter<IIonicSelectableEvent>;
  search!: EventEmitter<IIonicSelectableEvent>;
  searchFailed!: EventEmitter<IIonicSelectableEvent>;
  searchSuccessed!: EventEmitter<IIonicSelectableEvent>;
  beforeAddItem!: EventEmitter<IIonicSelectableEvent>;
  onChanged!: EventEmitter<IIonicSelectableEvent>;
  cleared!: EventEmitter<IIonicSelectableEvent>;
  changed!: EventEmitter<IIonicSelectableEvent>;
  itemsChanged!: EventEmitter<IIonicSelectableEvent>;
  selected!: EventEmitter<IIonicSelectableEvent>;
  opened!: EventEmitter<IIonicSelectableEvent>;
  closed!: EventEmitter<IIonicSelectableEvent>;
  focused!: EventEmitter<IIonicSelectableEvent>;
  blurred!: EventEmitter<IIonicSelectableEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, [
      'infiniteScroll',
      'search',
      'searchFailed',
      'searchSuccessed',
      'beforeAddItem',
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
