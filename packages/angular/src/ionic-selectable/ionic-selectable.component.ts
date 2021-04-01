import {
  EventEmitter,
  ElementRef,
  NgZone,
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  EmbeddedViewRef,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { proxyOutputs, ProxyCmp } from '../utils/proxies-utils';
import { Components, ITemplate, TemplateType } from '@ionic-selectable/core';
import { IonicSelectableItemTemplateDirective } from '../directives/ionic-selectable-item-template.directive';
import { TemplateContext } from '../utils/util';
import { IonicSelectableAddItemTemplateDirective } from '../directives/ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from '../directives/ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from '../directives/ionic-selectable-footer-template.directive';
import { IonicSelectableGroupEndTemplateDirective } from '../directives/ionic-selectable-group-end-template.directive';
import { IonicSelectableGroupTemplateDirective } from '../directives/ionic-selectable-group-template.directive';
import { IonicSelectableHeaderTemplateDirective } from '../directives/ionic-selectable-header-template.directive';
import { IonicSelectableIconTemplateDirective } from '../directives/ionic-selectable-icon-template.directive';
import { IonicSelectableItemEndTemplateDirective } from '../directives/ionic-selectable-item-end-template.directive';
import { IonicSelectableItemIconTemplateDirective } from '../directives/ionic-selectable-item-icon-template.directive';
import { IonicSelectableMessageTemplateDirective } from '../directives/ionic-selectable-message-template.directive';
import { IonicSelectablePlaceholderTemplateDirective } from '../directives/ionic-selectable-placeholder-template.directive';
import { IonicSelectableSearchFailTemplateDirective } from '../directives/ionic-selectable-search-fail-template.directive';
import { IonicSelectableTitleTemplateDirective } from '../directives/ionic-selectable-title-template.directive';
import { IonicSelectableValueTemplateDirective } from '../directives/ionic-selectable-value-template.directive';

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

  @ContentChild(IonicSelectableGroupTemplateDirective, { static: false })
  ionicSelectableGroupTemplateDirective!: IonicSelectableGroupTemplateDirective;

  @ContentChild(IonicSelectableHeaderTemplateDirective, { static: false })
  ionicSelectableHeaderTemplateDirective!: IonicSelectableHeaderTemplateDirective;

  @ContentChild(IonicSelectableIconTemplateDirective, { static: false })
  ionicSelectableIconTemplateDirective!: IonicSelectableIconTemplateDirective;

  @ContentChild(IonicSelectableItemEndTemplateDirective, { static: false })
  ionicSelectableItemEndTemplateDirective!: IonicSelectableItemEndTemplateDirective;

  @ContentChild(IonicSelectableItemIconTemplateDirective, { static: false })
  ionicSelectableItemIconTemplateDirective!: IonicSelectableItemIconTemplateDirective;

  @ContentChild(IonicSelectableItemTemplateDirective, { static: false })
  ionicSelectableItemTemplateDirective!: IonicSelectableItemTemplateDirective;

  @ContentChild(IonicSelectableMessageTemplateDirective, { static: false })
  ionicSelectableMessageTemplateDirective!: IonicSelectableMessageTemplateDirective;

  @ContentChild(IonicSelectablePlaceholderTemplateDirective, { static: false })
  ionicSelectablePlaceholderTemplateDirective!: IonicSelectablePlaceholderTemplateDirective;

  @ContentChild(IonicSelectableSearchFailTemplateDirective, { static: false })
  ionicSelectableSearchFailTemplateDirective!: IonicSelectableSearchFailTemplateDirective;

  @ContentChild(IonicSelectableTitleTemplateDirective, { static: false })
  ionicSelectableTitleTemplateDirective!: IonicSelectableTitleTemplateDirective;

  @ContentChild(IonicSelectableValueTemplateDirective, { static: false })
  ionicSelectableValueTemplateDirective!: IonicSelectableValueTemplateDirective;

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
      type: template.type,
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
    if (template.type !== ctx.type) {
      element.removeChild(element.lastChild);
      this.createEmbeddedView(element, template);
      return;
    }
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
        return !!this.ionicSelectableFooterTemplateDirective;
      case 'groupEnd':
        return !!this.ionicSelectableGroupEndTemplateDirective;
      case 'group':
        return !!this.ionicSelectableGroupTemplateDirective;
      case 'header':
        return !!this.ionicSelectableHeaderTemplateDirective;
      case 'icon':
        return !!this.ionicSelectableIconTemplateDirective;
      case 'item':
        return !!this.ionicSelectableItemTemplateDirective;
      case 'itemEnd':
        return !!this.ionicSelectableItemEndTemplateDirective;
      case 'itemIcon':
        return !!this.ionicSelectableItemIconTemplateDirective;
      case 'message':
        return !!this.ionicSelectableMessageTemplateDirective;
      case 'placeholder':
        return !!this.ionicSelectablePlaceholderTemplateDirective;
      case 'searchFail':
        return !!this.ionicSelectableSearchFailTemplateDirective;
      case 'title':
        return !!this.ionicSelectableTitleTemplateDirective;
      case 'value':
        return !!this.ionicSelectableValueTemplateDirective;
      default:
        return false;
    }
  }

  private getComponent(type: TemplateType): TemplateRef<TemplateContext> {
    switch (type) {
      case 'addItem':
        return this.ionicSelectableAddItemTemplateDirective.templateRef;
      case 'closeButton':
        return this.ionicSelectableCloseButtonTemplateDirective.templateRef;
      case 'footer':
        return this.ionicSelectableFooterTemplateDirective.templateRef;
      case 'groupEnd':
        return this.ionicSelectableGroupEndTemplateDirective.templateRef;
      case 'group':
        return this.ionicSelectableGroupTemplateDirective.templateRef;
      case 'header':
        return this.ionicSelectableHeaderTemplateDirective.templateRef;
      case 'icon':
        return this.ionicSelectableIconTemplateDirective.templateRef;
      case 'item':
        return this.ionicSelectableItemTemplateDirective.templateRef;
      case 'itemEnd':
        return this.ionicSelectableItemEndTemplateDirective.templateRef;
      case 'itemIcon':
        return this.ionicSelectableItemIconTemplateDirective.templateRef;
      case 'message':
        return this.ionicSelectableMessageTemplateDirective.templateRef;
      case 'placeholder':
        return this.ionicSelectablePlaceholderTemplateDirective.templateRef;
      case 'searchFail':
        return this.ionicSelectableSearchFailTemplateDirective.templateRef;
      case 'title':
        return this.ionicSelectableTitleTemplateDirective.templateRef;
      case 'value':
        return this.ionicSelectableValueTemplateDirective.templateRef;
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
