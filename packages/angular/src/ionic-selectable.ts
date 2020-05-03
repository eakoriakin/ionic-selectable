import {
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  EmbeddedViewRef,
} from '@angular/core';
import { proxyOutputs, ProxyCmp } from './proxies-utils';
import { Components, ITemplate, TemplateType } from 'test-isc';
import { IonicSelectableItemTemplateDirective } from './directives/ionic-selectable-item-template.directive';
import { TemplateContext } from './util';
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

  protected el: HTMLIonicSelectableElement;
  private refMap = new WeakMap<HTMLElement, EmbeddedViewRef<TemplateContext>>();

  @ContentChild(IonicSelectableItemTemplateDirective, { static: false })
  ionicSelectableItemTemplateDirectiveTmp!: IonicSelectableItemTemplateDirective;

  constructor(elementRef: ElementRef, protected z: NgZone) {
    this.el = elementRef.nativeElement as HTMLIonicSelectableElement;
    this.el.templateRender = this.render.bind(this);
    this.el.hasTemplateRender = this.hasTemplate.bind(this);
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

  private render(element: HTMLElement, template: ITemplate): HTMLElement {
    return this.z.run(() => {
      let node: EmbeddedViewRef<TemplateContext>;
      element.firstElementChild as HTMLElement;
      if (!element.firstElementChild) {
        node = this.ionicSelectableItemTemplateDirectiveTmp.viewContainer.createEmbeddedView(
          this.ionicSelectableItemTemplateDirectiveTmp.templateRef,
          {
            $implicit: template.value,
            isItemSelected: template.isItemSelected,
            isItemDisabled: template.isItemDisabled,
          }
        );
        const childElement = getElement(node);
        element.appendChild(childElement);
        this.refMap.set(childElement, node);
      } else {
        node = this.refMap.get(element.firstElementChild as HTMLElement)!;
        const ctx = node.context;
        ctx.$implicit = template.value;
        ctx.isItemSelected = template.isItemSelected;
        ctx.isItemDisabled = template.isItemDisabled;
      }
      // run sync change detections
      node.detectChanges();
      return element;
    });
  }

  private hasTemplate(type: TemplateType): boolean {
    switch (type) {
      case 'item':
        return !!this.ionicSelectableItemTemplateDirectiveTmp;
      default:
        return false;
    }
  }
}

const getElement = (view: EmbeddedViewRef<TemplateContext>): HTMLElement => {
  const rootNodes = view.rootNodes;
  for (let i = 0; i < rootNodes.length; i++) {
    if (rootNodes[i].nodeType === 1) {
      return rootNodes[i];
    }
  }
  throw new Error('element was not created');
};
