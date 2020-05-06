import {
  EventEmitter,
  ElementRef,
  NgZone,
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  EmbeddedViewRef,
  ViewContainerRef,
} from '@angular/core';
import { proxyOutputs, ProxyCmp } from '../utils/proxies-utils';
import { Components, ITemplate, TemplateType } from 'test-isc';
import { IonicSelectableItemTemplateDirective } from '../directives/ionic-selectable-item-template.directive';
import { TemplateContext } from '../utils/util';
import { IonicSelectableAddItemTemplateDirective } from '../directives/ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from '../directives/ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from '../directives/ionic-selectable-footer-template.directive';
import { IonicSelectableGroupEndTemplateDirective } from '../directives/ionic-selectable-group-end-template.directive';
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
    'showAddItemTemplate',
    'hideAddItemTemplate',
    '',
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
  private refAddItem: EmbeddedViewRef<TemplateContext>;

  @ContentChild(IonicSelectableAddItemTemplateDirective, { static: false })
  ionicSelectableAddItemTemplateDirective!: IonicSelectableAddItemTemplateDirective;

  @ContentChild(IonicSelectableCloseButtonTemplateDirective, { static: false })
  ionicSelectableCloseButtonTemplateDirective!: IonicSelectableCloseButtonTemplateDirective;

  @ContentChild(IonicSelectableFooterTemplateDirective, { static: false })
  ionicSelectableFooterTemplateDirective!: IonicSelectableFooterTemplateDirective;

  @ContentChild(IonicSelectableGroupEndTemplateDirective, { static: false })
  ionicSelectableGroupEndTemplateDirective!: IonicSelectableGroupEndTemplateDirective;

  @ContentChild(IonicSelectableItemTemplateDirective, { static: false })
  ionicSelectableItemTemplateDirective!: IonicSelectableItemTemplateDirective;

  constructor(private elementRef: ElementRef, protected z: NgZone, private viewContainerRef: ViewContainerRef) {
    this.el = this.elementRef.nativeElement as HTMLIonicSelectableElement;
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

  private render(element: HTMLElement, template: ITemplate) {
    this.z.run(() => {
      if (template.type === 'addItem') {
        if (!element) {
          this.refAddItem = null;
          return;
        }
        if (!this.refAddItem) {
          this.createEmbeddedView(element, template);
        } else {
          this.updateEmbeddedView(element, template);
        }
      } else {
        if (!element.isConnected && element.firstElementChild) {
          this.refMap.delete(element);
          return;
        }
        if (!this.refMap.get(element)) {
          this.createEmbeddedView(element, template);
        } else {
          this.updateEmbeddedView(element, template);
        }
      }
    });
  }

  private createEmbeddedView(element: HTMLElement, template: ITemplate) {
    const node = this.viewContainerRef.createEmbeddedView(this.getComponent(template.type), {
      $implicit: template.value,
      isItemSelected: template.isItemSelected,
      isItemDisabled: template.isItemDisabled,
      isAdd: template.isAdd,
    });
    const childElement = getElement(node);
    element.appendChild(childElement);
    if (template.type === 'addItem') {
      childElement.classList.add('ion-page');
      this.refAddItem = node;
    } else {
      this.refMap.set(element, node);
    }
    // run sync change detections
    node.detectChanges();
  }

  private updateEmbeddedView(element: HTMLElement, template: ITemplate) {
    const node = template.type === 'addItem' ? this.refAddItem : this.refMap.get(element)!;
    const ctx = node.context;
    ctx.$implicit = template.value;
    ctx.isItemSelected = template.isItemSelected;
    ctx.isItemDisabled = template.isItemDisabled;
    ctx.isAdd = template.isAdd;
    // run sync change detections
    node.detectChanges();
  }

  private hasTemplate(type: TemplateType): boolean {
    switch (type) {
      case 'addItem':
        return !!this.ionicSelectableAddItemTemplateDirective;
      case 'closeButton':
        return !!this.ionicSelectableCloseButtonTemplateDirective;
      case 'footer':
        !!this.ionicSelectableFooterTemplateDirective;
      case 'groupEnd':
        !!this.ionicSelectableGroupEndTemplateDirective;
      case 'item':
        return !!this.ionicSelectableItemTemplateDirective;
      default:
        return false;
    }
  }

  private getComponent(type: TemplateType) {
    switch (type) {
      case 'addItem':
        return this.ionicSelectableAddItemTemplateDirective.templateRef;
      case 'closeButton':
        return this.ionicSelectableCloseButtonTemplateDirective.templateRef;
      case 'footer':
        return this.ionicSelectableFooterTemplateDirective.templateRef;
      case 'groupEnd':
        return this.ionicSelectableGroupEndTemplateDirective.templateRef;
      case 'item':
        return this.ionicSelectableItemTemplateDirective.templateRef;
      default:
        throw new Error(`template for ${type} was not provided`);
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
