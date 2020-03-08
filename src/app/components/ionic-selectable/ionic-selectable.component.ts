// tslint:disable-next-line:max-line-length
import { Component, ContentChild, DoCheck, ElementRef, EventEmitter, forwardRef, HostBinding, Input, IterableDiffer, IterableDiffers, OnInit, Optional, Output, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonItem, ModalController, Platform } from '@ionic/angular';
import { AnimationBuilder, ModalOptions } from '@ionic/core';
import { Subscription } from 'rxjs';
import { IonicSelectableAddItemTemplateDirective } from './ionic-selectable-add-item-template.directive';
import { IonicSelectableCloseButtonTemplateDirective } from './ionic-selectable-close-button-template.directive';
import { IonicSelectableFooterTemplateDirective } from './ionic-selectable-footer-template.directive';
import { IonicSelectableGroupEndTemplateDirective } from './ionic-selectable-group-end-template.directive';
import { IonicSelectableGroupTemplateDirective } from './ionic-selectable-group-template.directive';
import { IonicSelectableHeaderTemplateDirective } from './ionic-selectable-header-template.directive';
import { IonicSelectableItemEndTemplateDirective } from './ionic-selectable-item-end-template.directive';
import { IonicSelectableItemIconTemplateDirective } from './ionic-selectable-item-icon-template.directive';
import { IonicSelectableItemTemplateDirective } from './ionic-selectable-item-template.directive';
import { IonicSelectableMessageTemplateDirective } from './ionic-selectable-message-template.directive';
import { IonicSelectableModalComponent } from './ionic-selectable-modal.component';
import { IonicSelectablePlaceholderTemplateDirective } from './ionic-selectable-placeholder-template.directive';
import { IonicSelectableSearchFailTemplateDirective } from './ionic-selectable-search-fail-template.directive';
import { IonicSelectableTitleTemplateDirective } from './ionic-selectable-title-template.directive';
import { IonicSelectableValueTemplateDirective } from './ionic-selectable-value-template.directive';
import { IonicSelectableIconTemplateDirective } from './ionic-selectable-icon-template.directive';

@Component({
  selector: 'ionic-selectable',
  templateUrl: './ionic-selectable.component.html',
  styleUrls: ['./ionic-selectable.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IonicSelectableComponent),
    multi: true
  }]
})
export class IonicSelectableComponent implements ControlValueAccessor, OnInit, DoCheck {
  @HostBinding('class.ionic-selectable')
  _cssClass = true;
  @HostBinding('class.ionic-selectable-ios')
  _isIos: boolean;
  @HostBinding('class.ionic-selectable-md')
  _isMD: boolean;
  @HostBinding('class.ionic-selectable-is-multiple')
  get _isMultipleCssClass(): boolean {
    return this.isMultiple;
  }
  @HostBinding('class.ionic-selectable-has-value')
  get _hasValueCssClass(): boolean {
    return this.hasValue();
  }
  @HostBinding('class.ionic-selectable-has-placeholder')
  get _hasPlaceholderCssClass(): boolean {
    return this._hasPlaceholder;
  }
  @HostBinding('class.ionic-selectable-has-label')
  get _hasIonLabelCssClass(): boolean {
    return this._hasIonLabel;
  }
  @HostBinding('class.ionic-selectable-label-default')
  get _hasDefaultIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'default';
  }
  @HostBinding('class.ionic-selectable-label-fixed')
  get _hasFixedIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'fixed';
  }
  @HostBinding('class.ionic-selectable-label-stacked')
  get _hasStackedIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'stacked';
  }
  @HostBinding('class.ionic-selectable-label-floating')
  get _hasFloatingIonLabelCssClass(): boolean {
    return this._ionLabelPosition === 'floating';
  }
  private _isOnSearchEnabled = true;
  private _isEnabled = true;
  private _shouldBackdropClose = true;
  private _isOpened = false;
  private _value: any = null;
  private _modal: HTMLIonModalElement;
  private _itemsDiffer: IterableDiffer<any>;
  private _hasObjects: boolean;
  private _canClear = false;
  private _hasConfirmButton = false;
  private _isMultiple = false;
  private _canAddItem = false;
  private _addItemObservable: Subscription;
  private _deleteItemObservable: Subscription;
  private onItemsChange: EventEmitter<any> = new EventEmitter();
  private _ionItemElement: any;
  private _ionLabelElement: any;
  private _hasIonLabel = false;
  private _ionLabelPosition: 'fixed' | 'stacked' | 'floating' | 'default' | null = null;
  private _label: string = null;
  private get _hasInfiniteScroll(): boolean {
    return this.isEnabled && this._modalComponent &&
      this._modalComponent._infiniteScroll ? true : false;
  }
  get _shouldStoreItemValue(): boolean {
    return this.shouldStoreItemValue && this._hasObjects;
  }
  _valueItems: any[] = [];
  _searchText = '';
  _hasSearchText = false;
  _groups: any[] = [];
  _itemsToConfirm: any[] = [];
  _selectedItems: any[] = [];
  _modalComponent: IonicSelectableModalComponent;
  _filteredGroups: any[] = [];
  _hasGroups: boolean;
  _isSearching: boolean;
  _hasPlaceholder: boolean;
  _isAddItemTemplateVisible = false;
  _isFooterVisible = true;
  _itemToAdd: any = null;
  _footerButtonsCount = 0;
  _hasFilteredItems = false;

  /**
   * Text of [Ionic Label](https://ionicframework.com/docs/api/label).
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#label).
   *
   * @readonly
   * @default null
   * @memberof IonicSelectableComponent
   */
  get label(): string {
    return this._label;
  }

  /**
   * Text that the user has typed in Searchbar.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#searchtext).
   *
   * @readonly
   * @default ''
   * @memberof IonicSelectableComponent
   */
  get searchText(): string {
    return this._searchText;
  }
  set searchText(searchText: string) {
    this._searchText = searchText;
    this._setHasSearchText();
  }

  /**
   * Determines whether search is running.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#issearching).
   *
   * @default false
   * @readonly
   * @memberof IonicSelectableComponent
   */
  get isSearching(): boolean {
    return this._isSearching;
  }

  /**
   * Determines whether user has typed anything in Searchbar.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hassearchtext).
   *
   * @default false
   * @readonly
   * @memberof IonicSelectableComponent
   */
  get hasSearchText(): boolean {
    return this._hasSearchText;
  }

  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;

    // Set value items.
    this._valueItems.splice(0, this._valueItems.length);

    if (this.isMultiple) {
      if (value && value.length) {
        Array.prototype.push.apply(this._valueItems, value);
      }
    } else {
      if (!this._isNullOrWhiteSpace(value)) {
        this._valueItems.push(value);
      }
    }

    this._setIonItemHasValue();
    this._setHasPlaceholder();
  }

  /**
   * A list of items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#items).
   *
   * @default []
   * @memberof IonicSelectableComponent
   */
  @Input()
  items: any[] = [];
  @Output()
  itemsChange: EventEmitter<any> = new EventEmitter();

  /**
   * Determines whether the component is enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isenabled).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @HostBinding('class.ionic-selectable-is-enabled')
  @Input('isEnabled')
  get isEnabled(): boolean {
    return this._isEnabled;
  }
  set isEnabled(isEnabled: boolean) {
    this._isEnabled = !!isEnabled;
    this.enableIonItem(this._isEnabled);
  }

  /**
   * Determines whether Modal should be closed when backdrop is clicked.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#shouldbackdropclose).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @Input('shouldBackdropClose')
  get shouldBackdropClose(): boolean {
    return this._shouldBackdropClose;
  }
  set shouldBackdropClose(shouldBackdropClose: boolean) {
    this._shouldBackdropClose = !!shouldBackdropClose;
  }

  /**
   * Modal CSS class.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalcssclass).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  modalCssClass: string = null;

  /**
   * Modal enter animation.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalenteranimation).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  modalEnterAnimation: AnimationBuilder = null;

  /**
   * Modal leave animation.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalleaveanimation).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  modalLeaveAnimation: AnimationBuilder = null;

  /**
   * Determines whether Modal is opened.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isopened).
   *
   * @default false
   * @readonly
   * @memberof IonicSelectableComponent
   */
  get isOpened(): boolean {
    return this._isOpened;
  }

  /**
   * Determines whether Confirm button is enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isconfirmbuttonenabled).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @Input()
  isConfirmButtonEnabled = true;

  /**
 * Determines whether Confirm button is visible for single selection.
 * By default Confirm button is visible only for multiple selection.
 * **Note**: It is always true for multiple selection and cannot be changed.
 * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasconfirmbutton).
 *
 * @default true
 * @memberof IonicSelectableComponent
 */
  @Input('hasConfirmButton')
  get hasConfirmButton(): boolean {
    return this._hasConfirmButton;
  }
  set hasConfirmButton(hasConfirmButton: boolean) {
    this._hasConfirmButton = !!hasConfirmButton;
    this._countFooterButtons();
  }

  /**
   * Item property to use as a unique identifier, e.g, `'id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemvaluefield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  itemValueField: string = null;

  /**
   * Item property to display, e.g, `'name'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemtextfield).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  itemTextField: string = null;

  /**
   *
   * Group property to use as a unique identifier to group items, e.g. `'country.id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#groupvaluefield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  groupValueField: string = null;

  /**
* Group property to display, e.g. `'country.name'`.
* **Note**: `items` should be an object array.
* See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#grouptextfield).
*
* @default null
* @memberof IonicSelectableComponent
*/
  @Input()
  groupTextField: string = null;

  /**
   * Determines whether to show Searchbar.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#cansearch).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  canSearch = false;

  /**
   * Determines whether `onSearch` event is enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isonsearchenabled).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @Input('isOnSearchEnabled')
  get isOnSearchEnabled(): boolean {
    return this._isOnSearchEnabled;
  }
  set isOnSearchEnabled(isOnSearchEnabled: boolean) {
    this._isOnSearchEnabled = !!isOnSearchEnabled;
  }

  /**
   * Determines whether to show Clear button.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#canclear).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @HostBinding('class.ionic-selectable-can-clear')
  @Input('canClear')
  get canClear(): boolean {
    return this._canClear;
  }
  set canClear(canClear: boolean) {
    this._canClear = !!canClear;
    this._countFooterButtons();
  }

  /**
   * Determines whether Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/) is enabled.
   * **Note**: Infinite scroll cannot be used together with virtual scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasinfinitescroll).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  hasInfiniteScroll = false;

  /**
   * Determines whether Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/) is enabled.
   * **Note**: Virtual scroll cannot be used together with infinite scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasvirtualscroll).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  hasVirtualScroll = false;

  /**
   * See Ionic VirtualScroll [approxItemHeight](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#virtualscrollapproxitemheight).
   *
   * @default '40px'
   * @memberof IonicSelectableComponent
   */
  @Input()
  virtualScrollApproxItemHeight = '40px';

  /**
   * A placeholder for Searchbar.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#searchplaceholder).
   *
   * @default 'Search'
   * @memberof IonicSelectableComponent
   */
  @Input()
  searchPlaceholder = 'Search';

  /**
   * A placeholder.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#placeholder).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  placeholder: string = null;

  /**
   * Determines whether multiple items can be selected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#ismultiple).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input('isMultiple')
  get isMultiple(): boolean {
    return this._isMultiple;
  }
  set isMultiple(isMultiple: boolean) {
    this._isMultiple = !!isMultiple;
    this._countFooterButtons();
  }

  /**
   * Text to display when no items have been found during search.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#searchfailtext).
   *
   * @default 'No items found.'
   * @memberof IonicSelectableComponent
   */
  @Input()
  searchFailText = 'No items found.';

  /**
   * Clear button text.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#clearbuttontext).
   *
   * @default 'Clear'
   * @memberof IonicSelectableComponent
   */
  @Input()
  clearButtonText = 'Clear';

  /**
   * Add button text.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#addbuttontext).
   *
   * @default 'Add'
   * @memberof IonicSelectableComponent
   */
  @Input()
  addButtonText = 'Add';

  /**
   * Confirm button text.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#confirmbuttontext).
   *
   * @default 'OK'
   * @memberof IonicSelectableComponent
   */
  @Input()
  confirmButtonText = 'OK';

  /**
   * Close button text.
   * The field is only applicable to **iOS** platform, on **Android** only Cross icon is displayed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#closebuttontext).
   *
   * @default 'Cancel'
   * @memberof IonicSelectableComponent
   */
  @Input()
  closeButtonText = 'Cancel';

  /**
   * Determines whether Searchbar should receive focus when Modal is opened.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#shouldfocussearchbar).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  shouldFocusSearchbar = false;

  /**
   * Header color. [Ionic colors](https://ionicframework.com/docs/theming/advanced#colors) are supported.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#headercolor).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  headerColor: string = null;

  /**
   * Group color. [Ionic colors](https://ionicframework.com/docs/theming/advanced#colors) are supported.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#groupcolor).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Input()
  groupColor: string = null;

  /**
   * Close button slot. [Ionic slots](https://ionicframework.com/docs/api/buttons) are supported.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#closebuttonslot).
   *
   * @default 'start'
   * @memberof IonicSelectableComponent
   */
  @Input()
  closeButtonSlot = 'start';

  /**
   * Item icon slot. [Ionic slots](https://ionicframework.com/docs/api/item) are supported.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemiconslot).
   *
   * @default 'start'
   * @memberof IonicSelectableComponent
   */
  @Input()
  itemIconSlot = 'start';

  /**
   * Fires when item/s has been selected and Modal closed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onchange).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onChange: EventEmitter<{ component: IonicSelectableComponent, value: any }> = new EventEmitter();

  /**
   * Fires when the user is typing in Searchbar.
   * **Note**: `canSearch` and `isOnSearchEnabled` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onsearch).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onSearch: EventEmitter<{ component: IonicSelectableComponent, text: string }> = new EventEmitter();

  /**
   * Fires when no items have been found.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onsearchfail).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onSearchFail: EventEmitter<{ component: IonicSelectableComponent, text: string }> = new EventEmitter();

  /**
   * Fires when some items have been found.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onsearchsuccess).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onSearchSuccess: EventEmitter<{ component: IonicSelectableComponent, text: string }> = new EventEmitter();

  /**
   * Fires when the user has scrolled to the end of the list.
   * **Note**: `hasInfiniteScroll` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#oninfinitescroll).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onInfiniteScroll: EventEmitter<{ component: IonicSelectableComponent, text: string }> = new EventEmitter();

  /**
   * Fires when Modal has been opened.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onopen).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onOpen: EventEmitter<{ component: IonicSelectableComponent }> = new EventEmitter();

  /**
   * Fires when Modal has been closed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onclose).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onClose: EventEmitter<{ component: IonicSelectableComponent }> = new EventEmitter();

  /**
   * Fires when an item has been selected or unselected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onselect).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onSelect: EventEmitter<{ component: IonicSelectableComponent, item: any, isSelected: boolean }> = new EventEmitter();

  /**
   * Fires when Clear button has been clicked.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onclear).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onClear: EventEmitter<{ component: IonicSelectableComponent, items: any[] }> = new EventEmitter();

  /**
   * A list of items that are selected and awaiting confirmation by user, when he has clicked Confirm button.
   * After the user has clicked Confirm button items to confirm are cleared.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemstoconfirm).
   *
   * @default []
   * @readonly
   * @memberof IonicSelectableComponent
   */
  get itemsToConfirm(): any[] {
    return this._itemsToConfirm;
  }

  /**
   * How long, in milliseconds, to wait to filter items or to trigger `onSearch` event after each keystroke.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#searchdebounce).
   *
   * @default 250
   * @memberof IonicSelectableComponent
   */
  @Input()
  searchDebounce: Number = 250;

  /**
   * A list of items to disable.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#disableditems).
   *
   * @default []
   * @memberof IonicSelectableComponent
   */
  @Input()
  disabledItems: any[] = [];

  /**
   * Determines whether item value only should be stored in `ngModel`, not the entire item.
   * **Note**: Item value is defined by `itemValueField`.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#shouldstoreitemvalue).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  shouldStoreItemValue = false;

  /**
   * Determines whether to allow editing items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#cansaveitem).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  canSaveItem = false;

  /**
   * Determines whether to allow deleting items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#candeleteitem).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input()
  canDeleteItem = false;

  /**
   * Determines whether to allow adding items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#canadditem).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Input('canAddItem')
  get canAddItem(): boolean {
    return this._canAddItem;
  }
  set canAddItem(canAddItem: boolean) {
    this._canAddItem = !!canAddItem;
    this._countFooterButtons();
  }

  /**
   * Fires when Edit item button has been clicked.
   * When the button has been clicked `ionicSelectableAddItemTemplate` will be shown. Use the template to create a form to edit item.
   * **Note**: `canSaveItem` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onsaveitem).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onSaveItem: EventEmitter<{ component: IonicSelectableComponent, item: any }> = new EventEmitter();

  /**
   * Fires when Delete item button has been clicked.
   * **Note**: `canDeleteItem` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#ondeleteitem).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onDeleteItem: EventEmitter<{ component: IonicSelectableComponent, item: any }> = new EventEmitter();

  /**
   * Fires when Add item button has been clicked.
   * When the button has been clicked `ionicSelectableAddItemTemplate` will be shown. Use the template to create a form to add item.
   * **Note**: `canAddItem` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onadditem).
   *
   * @memberof IonicSelectableComponent
   */
  @Output()
  onAddItem: EventEmitter<{ component: IonicSelectableComponent }> = new EventEmitter();

  @ContentChild(IonicSelectableValueTemplateDirective, { read: TemplateRef })
  valueTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableItemTemplateDirective, { read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableItemEndTemplateDirective, { read: TemplateRef })
  itemEndTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableTitleTemplateDirective, { read: TemplateRef })
  titleTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectablePlaceholderTemplateDirective, { read: TemplateRef })
  placeholderTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableMessageTemplateDirective, { read: TemplateRef })
  messageTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableGroupTemplateDirective, { read: TemplateRef })
  groupTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableGroupEndTemplateDirective, { read: TemplateRef })
  groupEndTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableCloseButtonTemplateDirective, { read: TemplateRef })
  closeButtonTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableSearchFailTemplateDirective, { read: TemplateRef })
  searchFailTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableAddItemTemplateDirective, { read: TemplateRef })
  addItemTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableFooterTemplateDirective, { read: TemplateRef })
  footerTemplate: TemplateRef<any>;
  _addItemTemplateFooterHeight: string;
  @ContentChild(IonicSelectableHeaderTemplateDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableItemIconTemplateDirective, { read: TemplateRef })
  itemIconTemplate: TemplateRef<any>;
  @ContentChild(IonicSelectableIconTemplateDirective, { read: TemplateRef })
  iconTemplate: TemplateRef<any>;

  /**
   * See Ionic VirtualScroll [headerFn](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#virtualscrollheaderfn).
   *
   * @memberof IonicSelectableComponent
   */
  @Input()
  virtualScrollHeaderFn = () => {
    return null;
  }

  constructor(
    private _modalController: ModalController,
    private _platform: Platform,
    @Optional() private ionItem: IonItem,
    private _iterableDiffers: IterableDiffers,
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {
    if (!this.items || !this.items.length) {
      this.items = [];
    }

    this._itemsDiffer = this._iterableDiffers.find(this.items).create();
  }

  initFocus() { }

  enableIonItem(isEnabled: boolean) {
    if (!this.ionItem) {
      return;
    }

    this.ionItem.disabled = !isEnabled;
  }

  _isNullOrWhiteSpace(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  _setHasSearchText() {
    this._hasSearchText = !this._isNullOrWhiteSpace(this._searchText);
  }

  _hasOnSearch(): boolean {
    return this.isOnSearchEnabled && this.onSearch.observers.length > 0;
  }

  _hasOnSaveItem(): boolean {
    return this.canSaveItem && this.onSaveItem.observers.length > 0;
  }

  _hasOnAddItem(): boolean {
    return this.canAddItem && this.onAddItem.observers.length > 0;
  }

  _hasOnDeleteItem(): boolean {
    return this.canDeleteItem && this.onDeleteItem.observers.length > 0;
  }

  _emitValueChange() {
    this.propagateOnChange(this.value);

    this.onChange.emit({
      component: this,
      value: this.value
    });
  }

  _emitSearch() {
    if (!this.canSearch) {
      return;
    }

    this.onSearch.emit({
      component: this,
      text: this._searchText
    });
  }

  _emitOnSelect(item: any, isSelected: boolean) {
    this.onSelect.emit({
      component: this,
      item: item,
      isSelected: isSelected
    });
  }

  _emitOnClear(items: any[]) {
    this.onClear.emit({
      component: this,
      items: items
    });
  }

  _emitOnSearchSuccessOrFail(isSuccess: boolean) {
    const eventData = {
      component: this,
      text: this._searchText
    };

    if (isSuccess) {
      this.onSearchSuccess.emit(eventData);
    } else {
      this.onSearchFail.emit(eventData);
    }
  }

  _formatItem(item: any): string {
    if (this._isNullOrWhiteSpace(item)) {
      return null;
    }

    return this.itemTextField ? item[this.itemTextField] : item.toString();
  }

  _formatValueItem(item: any): string {
    if (this._shouldStoreItemValue) {
      // Get item text from the list as we store it's value only.
      const selectedItem = this.items.find(_item => {
        return _item[this.itemValueField] === item;
      });

      return this._formatItem(selectedItem);
    } else {
      return this._formatItem(item);
    }
  }

  _getItemValue(item: any): any {
    if (!this._hasObjects) {
      return item;
    }

    return item[this.itemValueField];
  }

  _getStoredItemValue(item: any): any {
    if (!this._hasObjects) {
      return item;
    }

    return this._shouldStoreItemValue ? item : item[this.itemValueField];
  }

  _onSearchbarClear() {
    // Ionic Searchbar doesn't clear bind with ngModel value.
    // Do it ourselves.
    this._searchText = '';
  }

  _filterItems() {
    this._setHasSearchText();

    if (this._hasOnSearch()) {
      // Delegate filtering to the event.
      this._emitSearch();
    } else {
      // Default filtering.
      let groups = [];

      if (!this._searchText || !this._searchText.trim()) {
        groups = this._groups;
      } else {
        const filterText = this._searchText.trim().toLowerCase();

        this._groups.forEach(group => {
          const items = group.items.filter(item => {
            const itemText = (this.itemTextField ?
              item[this.itemTextField] : item).toString().toLowerCase();
            return itemText.indexOf(filterText) !== -1;
          });

          if (items.length) {
            groups.push({
              value: group.value,
              text: group.text,
              items: items
            });
          }
        });

        // No items found.
        if (!groups.length) {
          groups.push({
            items: []
          });
        }
      }

      this._filteredGroups = groups;
      this._hasFilteredItems = !this._areGroupsEmpty(groups);
      this._emitOnSearchSuccessOrFail(this._hasFilteredItems);
    }
  }

  _isItemDisabled(item: any): boolean {
    if (!this.disabledItems) {
      return;
    }

    return this.disabledItems.some(_item => {
      return this._getItemValue(_item) === this._getItemValue(item);
    });
  }

  _isItemSelected(item: any) {
    return this._selectedItems.find(selectedItem => {
      return this._getItemValue(item) === this._getStoredItemValue(selectedItem);
    }) !== undefined;
  }

  _addSelectedItem(item: any) {
    if (this._shouldStoreItemValue) {
      this._selectedItems.push(this._getItemValue(item));
    } else {
      this._selectedItems.push(item);
    }
  }

  _deleteSelectedItem(item: any) {
    let itemToDeleteIndex;

    this._selectedItems.forEach((selectedItem, itemIndex) => {
      if (
        this._getItemValue(item) ===
        this._getStoredItemValue(selectedItem)
      ) {
        itemToDeleteIndex = itemIndex;
      }
    });

    this._selectedItems.splice(itemToDeleteIndex, 1);
  }

  _click() {
    if (!this.isEnabled) {
      return;
    }

    this._label = this._getLabelText();
    this.open().then(() => {
      this.onOpen.emit({
        component: this
      });
    });
  }

  _saveItem(event: Event, item: any) {
    event.stopPropagation();
    this._itemToAdd = item;

    if (this._hasOnSaveItem()) {
      this.onSaveItem.emit({
        component: this,
        item: this._itemToAdd
      });
    } else {
      this.showAddItemTemplate();
    }
  }

  _deleteItemClick(event: Event, item: any) {
    event.stopPropagation();
    this._itemToAdd = item;

    if (this._hasOnDeleteItem()) {
      // Delegate logic to event.
      this.onDeleteItem.emit({
        component: this,
        item: this._itemToAdd
      });
    } else {
      this.deleteItem(this._itemToAdd);
    }
  }

  _addItemClick() {
    if (this._hasOnAddItem()) {
      this.onAddItem.emit({
        component: this
      });
    } else {
      this.showAddItemTemplate();
    }
  }

  _positionAddItemTemplate() {
    // Wait for the template to render.
    setTimeout(() => {
      const footer = this._modalComponent._element.nativeElement
        .querySelector('.ionic-selectable-add-item-template ion-footer');

      this._addItemTemplateFooterHeight = footer ? `calc(100% - ${footer.offsetHeight}px)` : '100%';
    }, 100);
  }

  _close() {
    this.close().then(() => {
      this.onClose.emit({
        component: this
      });
    });

    if (!this._hasOnSearch()) {
      this._searchText = '';
      this._setHasSearchText();
    }
  }

  _clear() {
    const selectedItems = this._selectedItems;

    this.clear();
    this._emitValueChange();
    this._emitOnClear(selectedItems);
    this.close().then(() => {
      this.onClose.emit({
        component: this
      });
    });
  }

  _getMoreItems() {
    this.onInfiniteScroll.emit({
      component: this,
      text: this._searchText
    });
  }

  _setItemsToConfirm(items: any[]) {
    // Return a copy of original array, so it couldn't be changed from outside.
    this._itemsToConfirm = [].concat(items);
  }

  _doSelect(selectedItem: any) {
    this.value = selectedItem;
    this._emitValueChange();
  }

  _select(item: any) {
    const isItemSelected = this._isItemSelected(item);

    if (this.isMultiple) {
      if (isItemSelected) {
        this._deleteSelectedItem(item);
      } else {
        this._addSelectedItem(item);
      }

      this._setItemsToConfirm(this._selectedItems);

      // Emit onSelect event after setting items to confirm so they could be used
      // inside the event.
      this._emitOnSelect(item, !isItemSelected);
    } else {
      if (this.hasConfirmButton || this.footerTemplate) {
        // Don't close Modal and keep track on items to confirm.
        // When footer template is used it's up to developer to close Modal.
        this._selectedItems = [];

        if (isItemSelected) {
          this._deleteSelectedItem(item);
        } else {
          this._addSelectedItem(item);
        }

        this._setItemsToConfirm(this._selectedItems);

        // Emit onSelect event after setting items to confirm so they could be used
        // inside the event.
        this._emitOnSelect(item, !isItemSelected);
      } else {
        if (!isItemSelected) {
          this._selectedItems = [];
          this._addSelectedItem(item);

          // Emit onSelect before onChange.
          this._emitOnSelect(item, true);

          if (this._shouldStoreItemValue) {
            this._doSelect(this._getItemValue(item));
          } else {
            this._doSelect(item);
          }
        }

        this._close();
      }
    }
  }

  _confirm() {
    this.confirm();
    this._close();
  }

  private _getLabelText(): string {
    return this._ionLabelElement ? this._ionLabelElement.textContent : null;
  }

  private _areGroupsEmpty(groups) {
    return groups.length === 0 || groups.every(group => {
      return !group.items || group.items.length === 0;
    });
  }

  private _countFooterButtons() {
    let footerButtonsCount = 0;

    if (this.canClear) {
      footerButtonsCount++;
    }

    if (this.isMultiple || this._hasConfirmButton) {
      footerButtonsCount++;
    }

    if (this.canAddItem) {
      footerButtonsCount++;
    }

    this._footerButtonsCount = footerButtonsCount;
  }

  private _setItems(items: any[]) {
    // It's important to have an empty starting group with empty items (groups[0].items),
    // because we bind to it when using VirtualScroll.
    // See https://github.com/eakoriakin/ionic-selectable/issues/70.
    let groups: any[] = [{
      items: items || []
    }];

    if (items && items.length) {
      if (this._hasGroups) {
        groups = [];

        items.forEach(item => {
          const groupValue = this._getPropertyValue(item, this.groupValueField),
            group = groups.find(_group => _group.value === groupValue);

          if (group) {
            group.items.push(item);
          } else {
            groups.push({
              value: groupValue,
              text: this._getPropertyValue(item, this.groupTextField),
              items: [item]
            });
          }
        });
      }
    }

    this._groups = groups;
    this._filteredGroups = this._groups;
    this._hasFilteredItems = !this._areGroupsEmpty(this._filteredGroups);
  }

  private _getPropertyValue(object: any, property: string): any {
    if (!property) {
      return null;
    }

    return property.split('.').reduce((_object, _property) => {
      return _object ? _object[_property] : null;
    }, object);
  }

  private _setIonItemHasFocus(hasFocus: boolean) {
    if (!this.ionItem) {
      return;
    }

    // Apply focus CSS class for proper stylying of ion-item/ion-label.
    this._setIonItemCssClass('item-has-focus', hasFocus);
  }

  private _setIonItemHasValue() {
    if (!this.ionItem) {
      return;
    }

    // Apply value CSS class for proper stylying of ion-item/ion-label.
    this._setIonItemCssClass('item-has-value', this.hasValue());
  }

  private _setHasPlaceholder() {
    this._hasPlaceholder = !this.hasValue() &&
      (!this._isNullOrWhiteSpace(this.placeholder) || this.placeholderTemplate) ?
      true : false;
  }

  private propagateOnChange = (_: any) => { };
  private propagateOnTouched = () => { };

  private _setIonItemCssClass(cssClass: string, shouldAdd: boolean) {
    if (!this._ionItemElement) {
      return;
    }

    // Change to Renderer2
    if (shouldAdd) {
      this._renderer.addClass(this._ionItemElement, cssClass);
    } else {
      this._renderer.removeClass(this._ionItemElement, cssClass);
    }
  }

  private _toggleAddItemTemplate(isVisible: boolean) {
    // It should be possible to show/hide the template regardless
    // canAddItem or canSaveItem parameters, so we could implement some
    // custom behavior. E.g. adding item when search fails using onSearchFail event.
    if (!this.addItemTemplate) {
      return;
    }

    // To make SaveItemTemplate visible we just position it over list using CSS.
    // We don't hide list with *ngIf or [hidden] to prevent its scroll position.
    this._isAddItemTemplateVisible = isVisible;
    this._isFooterVisible = !isVisible;
  }

  /* ControlValueAccessor */
  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(method: any): void {
    this.propagateOnChange = method;
  }

  registerOnTouched(method: () => void) {
    this.propagateOnTouched = method;
  }

  setDisabledState(isDisabled: boolean) {
    this.isEnabled = !isDisabled;
  }
  /* .ControlValueAccessor */

  ngOnInit() {
    this._isIos = this._platform.is('ios');
    this._isMD = !this._isIos;
    this._hasObjects = !this._isNullOrWhiteSpace(this.itemValueField);
    // Grouping is supported for objects only.
    // Ionic VirtualScroll has it's own implementation of grouping.
    this._hasGroups = Boolean(this._hasObjects && this.groupValueField && !this.hasVirtualScroll);

    if (this.ionItem) {
      this._ionItemElement = this._element.nativeElement.closest('ion-item');
      this._setIonItemCssClass('item-interactive', true);
      this._setIonItemCssClass('item-ionic-selectable', true);

      if (this._ionItemElement) {
        this._ionLabelElement = this._ionItemElement.querySelector('ion-label');

        if (this._ionLabelElement) {
          this._hasIonLabel = true;
          this._ionLabelPosition = this._ionLabelElement.getAttribute('position') || 'default';
        }
      }
    }

    this.enableIonItem(this.isEnabled);
  }

  ngDoCheck() {
    const itemsChanges = this._itemsDiffer.diff(this.items);

    if (itemsChanges) {
      this._setItems(this.items);
      this.value = this.value;

      this.onItemsChange.emit({
        component: this
      });
    }
  }

  /**
   * Adds item.
   * **Note**: If you want an item to be added to the original array as well use two-way data binding syntax on `[(items)]` field.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#additem).
   *
   * @param item Item to add.
   * @returns Promise that resolves when item has been added.
   * @memberof IonicSelectableComponent
   */
  addItem(item: any): Promise<any> {
    const self = this;

    // Adding item triggers onItemsChange.
    // Return a promise that resolves when onItemsChange finishes.
    // We need a promise or user could do something after item has been added,
    // e.g. use search() method to find the added item.
    this.items.unshift(item);

    // Close any running subscription.
    if (this._addItemObservable) {
      this._addItemObservable.unsubscribe();
    }

    return new Promise(function (resolve, reject) {
      // Complete callback isn't fired for some reason,
      // so unsubscribe in both success and fail cases.
      self._addItemObservable = self.onItemsChange.asObservable().subscribe(() => {
        self._addItemObservable.unsubscribe();
        resolve();
      }, () => {
        self._addItemObservable.unsubscribe();
        reject();
      });
    });
  }

  /**
 * Deletes item.
 * **Note**: If you want an item to be deleted from the original array as well use two-way data binding syntax on `[(items)]` field.
 * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#deleteitem).
 *
 * @param item Item to delete.
 * @returns Promise that resolves when item has been deleted.
 * @memberof IonicSelectableComponent
 */
  deleteItem(item: any): Promise<any> {
    const self = this;
    let hasValueChanged = false;

    // Remove deleted item from selected items.
    if (this._selectedItems) {
      this._selectedItems = this._selectedItems.filter(_item => {
        return this._getItemValue(item) !== this._getStoredItemValue(_item);
      });
    }

    // Remove deleted item from value.
    if (this.value) {
      if (this.isMultiple) {
        const values = this.value.filter(value => {
          return value.id !== item.id;
        });

        if (values.length !== this.value.length) {
          this.value = values;
          hasValueChanged = true;
        }
      } else {
        if (item === this.value) {
          this.value = null;
          hasValueChanged = true;
        }
      }
    }

    if (hasValueChanged) {
      this._emitValueChange();
    }

    // Remove deleted item from list.
    const items = this.items.filter(_item => {
      return _item.id !== item.id;
    });

    // Refresh items on parent component.
    this.itemsChange.emit(items);

    // Refresh list.
    this._setItems(items);

    this.onItemsChange.emit({
      component: this
    });

    // Close any running subscription.
    if (this._deleteItemObservable) {
      this._deleteItemObservable.unsubscribe();
    }

    return new Promise(function (resolve, reject) {
      // Complete callback isn't fired for some reason,
      // so unsubscribe in both success and fail cases.
      self._deleteItemObservable = self.onItemsChange.asObservable().subscribe(() => {
        self._deleteItemObservable.unsubscribe();
        resolve();
      }, () => {
        self._deleteItemObservable.unsubscribe();
        reject();
      });
    });
  }

  /**
   * Determines whether any item has been selected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasvalue).
   *
   * @returns A boolean determining whether any item has been selected.
   * @memberof IonicSelectableComponent
   */
  hasValue(): boolean {
    if (this.isMultiple) {
      return this._valueItems.length !== 0;
    } else {
      return this._valueItems.length !== 0 && !this._isNullOrWhiteSpace(this._valueItems[0]);
    }
  }

  /**
   * Opens Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#open).
   *
   * @returns Promise that resolves when Modal has been opened.
   * @memberof IonicSelectableComponent
   */
  open(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isEnabled || self._isOpened) {
        reject('IonicSelectable is disabled or already opened.');
        return;
      }

      self._filterItems();
      self._isOpened = true;

      const modalOptions: ModalOptions = {
        component: IonicSelectableModalComponent,
        componentProps: { selectComponent: self },
        backdropDismiss: self._shouldBackdropClose
      };

      if (self.modalCssClass) {
        modalOptions.cssClass = self.modalCssClass;
      }

      if (self.modalEnterAnimation) {
        modalOptions.enterAnimation = self.modalEnterAnimation;
      }

      if (self.modalLeaveAnimation) {
        modalOptions.leaveAnimation = self.modalLeaveAnimation;
      }

      self._modalController.create(modalOptions).then(modal => {
        self._modal = modal;
        modal.present().then(() => {
          // Set focus after Modal has opened to avoid flickering of focus highlighting
          // before Modal opening.
          self._setIonItemHasFocus(true);
          resolve();
        });

        modal.onWillDismiss().then(() => {
          self._setIonItemHasFocus(false);
        });

        modal.onDidDismiss().then(event => {
          self._isOpened = false;
          self._itemsToConfirm = [];

          // Closed by clicking on backdrop outside modal.
          if (event.role === 'backdrop') {
            self.onClose.emit({
              component: self
            });
          }
        });
      });
    });
  }

  /**
   * Closes Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#close).
   *
   * @returns Promise that resolves when Modal has been closed.
   * @memberof IonicSelectableComponent
   */
  close(): Promise<void> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isEnabled || !self._isOpened) {
        reject('IonicSelectable is disabled or already closed.');
        return;
      }

      self.propagateOnTouched();
      self._isOpened = false;
      self._itemToAdd = null;
      self._modal.dismiss().then(() => {
        self._setIonItemHasFocus(false);
        self.hideAddItemTemplate();
        resolve();
      });
    });
  }

  /**
   * Clears value.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#clear).
   *
   * @memberof IonicSelectableComponent
   */
  clear() {
    this.value = this.isMultiple ? [] : null;
    this._itemsToConfirm = [];
    this.propagateOnChange(this.value);
  }

  /**
   * Confirms selected items by updating value.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#confirm).
   *
   * @memberof IonicSelectableComponent
   */
  confirm() {
    if (this.isMultiple) {
      this._doSelect(this._selectedItems);
    } else if (this.hasConfirmButton || this.footerTemplate) {
      this._doSelect(this._selectedItems[0] || null);
    }
  }

  /**
   * Selects or deselects all or specific items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#toggleitems).
   *
   * @param isSelect Determines whether to select or deselect items.
   * @param [items] Items to toggle. If items are not set all items will be toggled.
   * @memberof IonicSelectableComponent
   */
  toggleItems(isSelect: boolean, items?: any[]) {
    if (isSelect) {
      const hasItems = items && items.length;
      let itemsToToggle = this._groups.reduce((allItems, group) => {
        return allItems.concat(group.items);
      }, []);

      // Don't allow to select all items in single mode.
      if (!this.isMultiple && !hasItems) {
        itemsToToggle = [];
      }

      // Toggle specific items.
      if (hasItems) {
        itemsToToggle = itemsToToggle.filter(itemToToggle => {
          return items.find(item => {
            return this._getItemValue(itemToToggle) === this._getItemValue(item);
          }) !== undefined;
        });

        // Take the first item for single mode.
        if (!this.isMultiple) {
          itemsToToggle.splice(0, 1);
        }
      }

      itemsToToggle.forEach(item => {
        this._addSelectedItem(item);
      });
    } else {
      this._selectedItems = [];
    }

    this._setItemsToConfirm(this._selectedItems);
  }

  /**
   * Scrolls to the top of Modal content.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#scrolltotop).
   *
   * @returns Promise that resolves when scroll has been completed.
   * @memberof IonicSelectableComponent
   */
  scrollToTop(): Promise<any> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isOpened) {
        reject('IonicSelectable content cannot be scrolled.');
        return;
      }

      self._modalComponent._content.scrollToTop().then(() => {
        resolve();
      });
    });
  }

  /**
   * Scrolls to the bottom of Modal content.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#scrolltobottom).
   *
   * @returns Promise that resolves when scroll has been completed.
   * @memberof IonicSelectableComponent
   */
  scrollToBottom(): Promise<any> {
    const self = this;

    return new Promise(function (resolve, reject) {
      if (!self._isOpened) {
        reject('IonicSelectable content cannot be scrolled.');
        return;
      }

      self._modalComponent._content.scrollToBottom().then(() => {
        resolve();
      });
    });
  }

  /**
   * Starts search process by showing Loading spinner.
   * Use it together with `onSearch` event to indicate search start.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#startsearch).
   *
   * @memberof IonicSelectableComponent
   */
  startSearch() {
    if (!this._isEnabled) {
      return;
    }

    this.showLoading();
  }

  /**
   * Ends search process by hiding Loading spinner and refreshing items.
   * Use it together with `onSearch` event to indicate search end.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#endsearch).
   *
   * @memberof IonicSelectableComponent
   */
  endSearch() {
    if (!this._isEnabled) {
      return;
    }

    this.hideLoading();

    // When inside Ionic Modal and onSearch event is used,
    // ngDoCheck() doesn't work as _itemsDiffer fails to detect changes.
    // See https://github.com/eakoriakin/ionic-selectable/issues/44.
    // Refresh items manually.
    this._setItems(this.items);
    this._emitOnSearchSuccessOrFail(this._hasFilteredItems);
  }

  /**
   * Enables infinite scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#enableinfinitescroll).
   *
   * @memberof IonicSelectableComponent
   */
  enableInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.disabled = false;
  }

  /**
   * Disables infinite scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#disableinfinitescroll).
   *
   * @memberof IonicSelectableComponent
   */
  disableInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.disabled = true;
  }

  /**
   * Ends infinite scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#endinfinitescroll).
   *
   * @memberof IonicSelectableComponent
   */
  endInfiniteScroll() {
    if (!this._hasInfiniteScroll) {
      return;
    }

    this._modalComponent._infiniteScroll.complete();
    this._setItems(this.items);
  }

  /**
   * Triggers search of items.
   * **Note**: `canSearch` has to be enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#search).
   *
   * @param text Text to search items by.
   * @memberof IonicSelectableComponent
   */
  search(text: string) {
    if (!this._isEnabled || !this._isOpened || !this.canSearch) {
      return;
    }

    this._searchText = text;
    this._setHasSearchText();
    this._filterItems();
  }

  /**
   * Shows Loading spinner.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#showloading).
   *
   * @memberof IonicSelectableComponent
   */
  showLoading() {
    if (!this._isEnabled) {
      return;
    }

    this._isSearching = true;
  }

  /**
   * Hides Loading spinner.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hideloading).
   *
   * @memberof IonicSelectableComponent
   */
  hideLoading() {
    if (!this._isEnabled) {
      return;
    }

    this._isSearching = false;
  }

  /**
   * Shows `ionicSelectableAddItemTemplate`.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#showadditemtemplate).
   *
   * @memberof IonicSelectableComponent
   */
  showAddItemTemplate() {
    this._toggleAddItemTemplate(true);

    // Position the template only when it shous up.
    this._positionAddItemTemplate();
  }

  /**
   * Hides `ionicSelectableAddItemTemplate`.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hideadditemtemplate).
   *
   * @memberof IonicSelectableComponent
   */
  hideAddItemTemplate() {
    // Clean item to add as it's no longer needed once Add Item Modal has been closed.
    this._itemToAdd = null;
    this._toggleAddItemTemplate(false);
  }
}
