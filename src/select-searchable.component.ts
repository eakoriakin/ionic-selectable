import { Component, ContentChild, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges, TemplateRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form, InfiniteScroll, Item, Modal, ModalController, Platform } from 'ionic-angular';
import { SelectSearchableItemRightTemplateDirective } from './select-searchable-item-right-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
import { SelectSearchableMessageTemplateDirective } from './select-searchable-message-template.directive';
import { SelectSearchablePageComponent } from './select-searchable-page.component';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';

@Component({
    selector: 'select-searchable',
    template: `
        <div class="select-searchable-label">
            <div *ngIf="labelTemplate" [ngTemplateOutlet]="labelTemplate">
            </div>
        </div>
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
        <button aria-haspopup="true" ion-button="item-cover" class="item-cover"></button>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectSearchableComponent),
        multi: true
    }]
})
export class SelectSearchableComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @HostBinding('class.select-searchable')
    private _cssClass = true;
    private _items: any[] = [];
    @HostBinding('class.select-searchable-ios')
    private _isIos: boolean;
    @HostBinding('class.select-searchable-md')
    private _isMD: boolean;
    private _useSearch = true;
    private _isEnabled = true;
    private _isOpened = false;
    private _valueItems: any[] = [];
    private _value: any = null;
    private _modal: Modal;
    _filterText = '';
    _itemsToConfirm: any[] = [];
    _selectPageComponent: SelectSearchablePageComponent;
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
            if (value) {
                this._valueItems.push(value);
            }
        }
    }
    get items(): any[] {
        return this._items;
    }
    @Input('items')
    set items(items: any[]) {
        // The original reference of the array should be preserved to keep two-way data binding
        // working between SelectSearchable and SelectSearchablePage.
        this._items.splice(0, this._items.length);

        // Add new items to the array.
        Array.prototype.push.apply(this._items, items);
    }
    @Input()
    isSearching: boolean;
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
    canSearch = false;
    @Input('useSearch')
    get useSearch(): boolean {
        return this._useSearch;
    }
    set useSearch(useSearch: boolean) {
        this._useSearch = !!useSearch;
    }
    @HostBinding('class.select-searchable-can-reset')
    @Input()
    canReset = false;
    @Input()
    hasInfiniteScroll = false;
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
    @ContentChild(SelectSearchableLabelTemplateDirective, { read: TemplateRef })
    labelTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableTitleTemplateDirective, { read: TemplateRef })
    titleTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableMessageTemplateDirective, { read: TemplateRef })
    messageTemplate: TemplateRef<any>;
    get itemsToConfirm(): any[] {
        return this._itemsToConfirm;
    }
    @Input()
    searchDebounce: Number = 250;
    @Input()
    isItemEnabled: Function;

    constructor(
        private modalController: ModalController,
        private ionForm: Form,
        private platform: Platform,
        @Optional() private ionItem: Item
    ) { }

    initFocus() { }

    enableIonItem(isEnabled: boolean) {
        if (!this.ionItem) {
            return;
        }

        this.ionItem.setElementClass('item-select-searchable-is-enabled', isEnabled);
    }

    @HostListener('click', ['$event'])
    _click(event: UIEvent) {
        if (!this.isEnabled || event.detail === 0) {
            // Don't continue if the click event came from a form submit.
            return;
        }

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
        return this.useSearch && this.onSearch.observers.length > 0;
    }

    _select(selectedItem: any) {
        this.value = this.isMultiple ? selectedItem || [] : selectedItem;
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

    private propagateChange = (_: any) => { };

    /* ControlValueAccessor */
    writeValue(value: any) {
        this.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }

    setDisabledState(isDisabled: boolean) { }
    /* .ControlValueAccessor */

    ngOnInit() {
        this._isIos = this.platform.is('ios');
        this._isMD = !this._isIos;
        this.ionForm.register(this);

        if (this.ionItem) {
            this.ionItem.setElementClass('item-select-searchable', true);
        }

        this.enableIonItem(this.isEnabled);
    }

    ngOnDestroy() {
        this.ionForm.deregister(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['items'] && this.items.length > 0) {
            this.setValue(this.value);
        }
    }

    setValue(value: any) {
        this.value = value;

        // Get an item from the list for value.
        // We need this in case value contains only id, which is not sufficient for template rendering.
        if (this.value && !this._isNullOrWhiteSpace(this.value[this.itemValueField])) {
            let selectedItem = this.items.find(item => {
                return item[this.itemValueField] === this.value[this.itemValueField];
            });

            if (selectedItem) {
                this.value = selectedItem;
            }
        }
    }

    public open(): Promise<any> {
        let self = this;

        return new Promise(function (resolve, reject) {
            if (!self._isEnabled || self._isOpened) {
                reject('SelectSearchable is disabled or already opened.');
                return;
            }

            self._isOpened = true;
            self._modal = self.modalController.create(SelectSearchablePageComponent, {
                selectComponent: self
            });
            self._modal.present().then(() => {
                resolve();
            });
            self._modal.onDidDismiss((data, role) => {
                self._isOpened = false;

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
                resolve();
            });
        });
    }

    public reset() {
        this.setValue(this.isMultiple ? [] : null);

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
}
