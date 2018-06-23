import { Component, ContentChild, DoCheck, EventEmitter, forwardRef, HostBinding, HostListener, Input, IterableDiffer, IterableDiffers, OnDestroy, OnInit, Optional, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form, InfiniteScroll, Item, Modal, ModalController, Platform } from 'ionic-angular';
import { SelectSearchableGroupRightTemplateDirective } from './select-searchable-group-right-template.directive';
import { SelectSearchableGroupTemplateDirective } from './select-searchable-group-template.directive';
import { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';
import { SelectSearchablePageComponent } from './select-searchable-page.component';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';

@Component({
    selector: 'select-searchable',
    template: `
        <div class="select-searchable-value">
            <div *ngIf="valueTemplate && _valueItems.length && isMultiple"
                [ngTemplateOutlet]="valueTemplate"
                [ngTemplateOutletContext]="{ value: _valueItems }">
            </div>
            <div class="select-searchable-value-item"
                *ngIf="valueTemplate && _valueItems.length && !isMultiple">
                <div [ngTemplateOutlet]="valueTemplate"
                    [ngTemplateOutletContext]="{ value: _valueItems[0] }">
                </div>
            </div>
            <span *ngIf="!valueTemplate">
                <div class="select-searchable-value-item" *ngFor="let valueItem of _valueItems">
                    {{_formatItem(valueItem)}}
                </div>
            </span>
        </div>
        <div class="select-searchable-icon">
            <div class="select-searchable-icon-inner"></div>
        </div>
        <button aria-haspopup="true" ion-button="item-cover" class="item-cover"
            [disabled]="!isEnabled">
        </button>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectSearchableComponent),
        multi: true
    }]
})
export class SelectSearchableComponent implements ControlValueAccessor, OnInit, OnDestroy, DoCheck {
    @HostBinding('class.select-searchable')
    private _cssClass = true;
    @HostBinding('class.select-searchable-ios')
    private _isIos: boolean;
    @HostBinding('class.select-searchable-md')
    private _isMD: boolean;
    @HostBinding('class.select-searchable-is-multiple')
    private get _isMultipleCssClass(): boolean {
        return this.isMultiple;
    }
    @HostBinding('class.select-searchable-has-value')
    private get _hasValueCssClass(): boolean {
        return this._hasValue();
    }
    private _isOnSearchEnabled = true;
    private _isEnabled = true;
    private _isOpened = false;
    private _valueItems: any[] = [];
    private _value: any = null;
    private _modal: Modal;
    private _itemsDiffer: IterableDiffer<any>;
    private _hasObjects: boolean;
    get _shouldStoreItemValue(): boolean {
        return this.shouldStoreItemValue && this._hasObjects;
    }
    _filterText = '';
    _groups: any[] = [];
    _itemsToConfirm: any[] = [];
    _selectPageComponent: SelectSearchablePageComponent;
    _hasGroups: boolean;
    _isSearching: boolean;
    _labelText: string;
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
    }
    @Input()
    items: any[] = [];
    @HostBinding('class.select-searchable-is-enabled')
    @Input('isEnabled')
    get isEnabled(): boolean {
        return this._isEnabled;
    }
    set isEnabled(isEnabled: boolean) {
        this._isEnabled = !!isEnabled;
        this.enableIonItem(this._isEnabled);
    }
    get isOpened(): boolean {
        return this._isOpened;
    }
    @Input('isOkButtonEnabled')
    isOkButtonEnabled = true;
    @Input()
    itemValueField: string;
    @Input()
    itemTextField: string;
    @Input()
    groupValueField: string;
    @Input()
    groupTextField: string;
    @Input()
    canSearch = false;
    @Input('isOnSearchEnabled')
    get isOnSearchEnabled(): boolean {
        return this._isOnSearchEnabled;
    }
    set isOnSearchEnabled(isOnSearchEnabled: boolean) {
        this._isOnSearchEnabled = !!isOnSearchEnabled;
    }
    @HostBinding('class.select-searchable-can-reset')
    @Input()
    canReset = false;
    @Input()
    hasInfiniteScroll = false;
    @Input()
    hasVirtualScroll = false;
    @Input()
    virtualScrollApproxItemHeight = '40px';
    @Input()
    virtualScrollApproxItemWidth = '100%';
    @Input()
    virtualScrollBufferRatio = 3;
    @Input()
    virtualScrollHeaderFn = () => { return null; }
    @Input()
    searchPlaceholder: string;
    @Input()
    isMultiple: boolean;
    @Input()
    noItemsFoundText = 'No items found.';
    @Input()
    resetButtonText = 'Clear';
    @Input()
    okButtonText = 'OK';
    @Input()
    closeButtonText = 'Cancel';
    @Input()
    focusSearchbar = false;
    @Input()
    headerColor: string;
    @Input()
    groupColor: string;
    @Output()
    onChange: EventEmitter<any> = new EventEmitter();
    @Output()
    onSearch: EventEmitter<any> = new EventEmitter();
    @Output()
    onInfiniteScroll: EventEmitter<any> = new EventEmitter();
    @Output()
    onOpen: EventEmitter<any> = new EventEmitter();
    @Output()
    onClose: EventEmitter<any> = new EventEmitter();
    @ContentChild(SelectSearchableValueTemplateDirective, { read: TemplateRef })
    valueTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableItemTemplateDirective, { read: TemplateRef })
    itemTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableItemRightTemplateDirective, { read: TemplateRef })
    itemRightTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableTitleTemplateDirective, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableMessageTemplateDirective, { read: TemplateRef })
    messageTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableGroupTemplateDirective, { read: TemplateRef })
    groupTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableGroupRightTemplateDirective, { read: TemplateRef })
    groupRightTemplate: TemplateRef<any>;
    get itemsToConfirm(): any[] {
        return this._itemsToConfirm;
    }
    @Input()
    searchDebounce: Number = 250;
    @Input()
    disabledItems: any[] = [];
    @Input()
    shouldStoreItemValue = false;

    constructor(
        private _modalController: ModalController,
        private ionForm: Form,
        private _platform: Platform,
        @Optional() private ionItem: Item,
        private _iterableDiffers: IterableDiffers
    ) {
        this._itemsDiffer = this._iterableDiffers.find(this.items).create();
    }

    initFocus() { }

    enableIonItem(isEnabled: boolean) {
        if (!this.ionItem) {
            return;
        }

        this.ionItem.setElementClass('item-select-disabled', !isEnabled);
    }

    @HostListener('click', ['$event'])
    _click(event: UIEvent) {
        if (!this.isEnabled || event.detail === 0) {
            // Don't continue if the click event came from a form submit.
            return;
        }

        this._labelText = this._getLabelText();
        event.preventDefault();
        event.stopPropagation();
        this.open().then(() => {
            this.onOpen.emit({
                component: this
            });
        });
    }

    _isNullOrWhiteSpace(value: any): boolean {
        if (value === null || value === undefined) {
            return true;
        }

        // Convert value to string in case if it's not.
        return value.toString().replace(/\s/g, '').length < 1;
    }

    _hasSearch(): boolean {
        return this.isOnSearchEnabled && this.onSearch.observers.length > 0;
    }

    _select(selectedItem: any) {
        this._setValue(selectedItem);
        this._emitChange();
    }

    _emitChange() {
        this.propagateChange(this.value);
        this.onChange.emit({
            component: this,
            value: this.value
        });
    }

    _emitSearch(infiniteScroll: InfiniteScroll) {
        if (!this.canSearch) {
            return;
        }

        this.onSearch.emit({
            component: this,
            infiniteScroll: infiniteScroll,
            text: this._filterText
        });
    }

    _formatItem(item: any): string {
        if (this._isNullOrWhiteSpace(item)) {
            return null;
        }

        return this.itemTextField ? item[this.itemTextField] : item.toString();
    }

    _getLabelText(): string {
        let label = this.ionItem ? this.ionItem.getNativeElement().querySelector('ion-label') : null;
        return label ? label.textContent : null;
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

    private _setItems(items: any[]) {
        let groups = [];

        if (items && items.length) {
            if (this._hasGroups) {
                groups = [];

                items.forEach(item => {
                    let groupValue = this._getPropertyValue(item, this.groupValueField),
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

            } else {
                groups.push({
                    items: items
                });
            }
        }

        // The original reference of the array should be preserved to keep two-way data binding
        // between SelectSearchable and SelectSearchablePage.
        this._groups.splice(0, this._groups.length);

        // Add new items to the array.
        Array.prototype.push.apply(this._groups, groups);
    }

    private _setValue(value: any) {
        this.value = value;
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
        // Apply focus CSS class for proper stylying of ion-item/ion-label.
        this.ionItem.setElementClass('item-input-has-focus', hasFocus);
    }

    private _setIonItemHasValue() {
        // Apply value CSS class for proper stylying of ion-item/ion-label.
        this.ionItem.setElementClass('item-input-has-value', this._hasValue());
    }

    private _hasValue(): boolean {
        if (this.isMultiple) {
            return this._valueItems.length !== 0;
        } else {
            return this._valueItems.length !== 0 && !this._isNullOrWhiteSpace(this._valueItems[0]);
        }
    }

    private propagateChange = (_: any) => { };

    /* ControlValueAccessor */
    writeValue(value: any) {
        this._setValue(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }

    setDisabledState(isDisabled: boolean) { }
    /* .ControlValueAccessor */

    ngOnInit() {
        this._isIos = this._platform.is('ios');
        this._isMD = !this._isIos;
        this._hasObjects = !this._isNullOrWhiteSpace(this.itemValueField);
        // Grouping is supported for objects only.
        // Ionic VirtualScroll has it's own implementation of grouping.
        this._hasGroups = Boolean(this._hasObjects && this.groupValueField && !this.hasVirtualScroll);
        this.ionForm.register(this);

        if (this.ionItem) {
            this.ionItem.setElementClass('item-select', true);
            this.ionItem.setElementClass('item-select-searchable', true);
        }

        this.enableIonItem(this.isEnabled);
    }

    ngOnDestroy() {
        this.ionForm.deregister(this);
    }

    ngDoCheck() {
        let itemsChanges = this._itemsDiffer.diff(this.items);

        if (itemsChanges) {
            this._setItems(this.items);
            this._setValue(this.value);
        }
    }

    public open(): Promise<any> {
        let self = this;

        if (self._isEnabled && !self._isOpened) {
            self._setIonItemHasFocus(true);
        }

        return new Promise(function (resolve, reject) {
            if (!self._isEnabled || self._isOpened) {
                reject('SelectSearchable is disabled or already opened.');
                return;
            }

            self._isOpened = true;
            self._modal = self._modalController.create(SelectSearchablePageComponent, {
                selectComponent: self
            });
            self._modal.present().then(() => {
                resolve();
            });
            self._modal.onDidDismiss((data, role) => {
                self._isOpened = false;
                self._setIonItemHasFocus(false);

                if (self.isMultiple) {
                    self._itemsToConfirm = [];
                }

                // Closed by clicking on backdrop outside modal.
                if (role === 'backdrop') {
                    self.onClose.emit({
                        component: self
                    });
                }
            });
        });
    }

    public close(): Promise<any> {
        let self = this;

        return new Promise(function (resolve, reject) {
            if (!self._isEnabled || !self._isOpened) {
                reject('SelectSearchable is disabled or already closed.');
                return;
            }

            self._isOpened = false;
            self._modal.dismiss().then(() => {
                self._setIonItemHasFocus(false);
                resolve();
            });
        });
    }

    public reset() {
        this._setValue(this.isMultiple ? [] : null);

        if (this.isMultiple) {
            this._itemsToConfirm = [];
        }
    }

    public scrollToTop(): Promise<any> {
        let self = this;

        return new Promise(function (resolve, reject) {
            if (!self._isOpened) {
                reject('SelectSearchable content cannot be scrolled.');
                return;
            }

            self._selectPageComponent._content.scrollToTop().then(() => {
                resolve();
            });
        });
    }

    public scrollToBottom(): Promise<any> {
        let self = this;

        return new Promise(function (resolve, reject) {
            if (!self._isOpened) {
                reject('SelectSearchable content cannot be scrolled.');
                return;
            }

            self._selectPageComponent._content.scrollToBottom().then(() => {
                resolve();
            });
        });
    }

    public startSearch() {
        this._isSearching = true;
    }

    public endSearch() {
        this._isSearching = false;

        // When inside Ionic Modal and onSearch event is used,
        // ngDoCheck() doesn't work as _itemsDiffer fails to detect changes.
        // See https://github.com/eakoriakin/ionic-select-searchable/issues/44.
        // Refresh items manually.
        this._setItems(this.items);
    }
}
