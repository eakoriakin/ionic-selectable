import {
    Component, Input, Output, EventEmitter, Optional, OnInit, OnDestroy, forwardRef, HostListener, OnChanges,
    SimpleChanges, TemplateRef, ContentChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Item, Form, Platform, InfiniteScroll, ModalController, Modal } from 'ionic-angular';
import { SelectSearchablePageComponent } from './select-searchable-page.component';
import { SelectSearchableValueTemplateDirective } from './select-searchable-value-template.directive';
import { SelectSearchableItemTemplateDirective } from './select-searchable-item-template.directive';
import { SelectSearchableLabelTemplateDirective } from './select-searchable-label-template.directive';
import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.directive';

@Component({
    selector: 'select-searchable',
    template: `
        <div class="select-searchable-label">
            <div *ngIf="labelTemplate" [ngTemplateOutlet]="labelTemplate">
            </div>
        </div>
        <div class="select-searchable-value">
            <div *ngIf="valueTemplate && _valueItems.length && multiple"
                [ngTemplateOutlet]="valueTemplate"
                [ngTemplateOutletContext]="{ value: _valueItems }">
            </div>
            <div class="select-searchable-value-item"
                *ngIf="valueTemplate && _valueItems.length && !multiple">
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
    }],
    host: {
        'class': 'select-searchable',
        '[class.select-searchable-ios]': '_isIos',
        '[class.select-searchable-md]': '_isMd',
        '[class.select-searchable-can-reset]': 'canReset',
        '[class.select-searchable-is-enabled]': 'isEnabled'
    }
})
export class SelectSearchableComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    private _items: any[] = [];
    private _isIos: boolean;
    private _isMd: boolean;
    private _useSearch = true;
    private _isEnabled = true;
    private _isOpened = false;
    private _valueItems: any[] = [];
    private _value: any = null;
    private _modal: Modal;
    filterText = '';
    get value(): any {
        return this._value;
    }
    set value(value: any) {
        this._value = value;

        // Set value items.
        this._valueItems.splice(0, this._valueItems.length);

        if (this.multiple) {
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
    @Input() isSearching: boolean;
    @Input('isEnabled')
    get isEnabled(): boolean {
        return this._isEnabled;
    }
    set isEnabled(isEnabled: boolean) {
        this._isEnabled = !!isEnabled;
        this.enableIonItem(this._isEnabled);
    }
    @Input() itemValueField: string;
    @Input() itemTextField: string;
    @Input() canSearch = false;
    @Input('useSearch')
    get useSearch(): boolean {
        return this._useSearch;
    }
    set useSearch(useSearch: boolean) {
        this._useSearch = !!useSearch;
    }
    @Input() canReset = false;
    @Input() hasInfiniteScroll = false;
    @Input() searchPlaceholder: string;
    @Input() multiple: boolean;
    @Input() noItemsFoundText = 'No items found.';
    @Input() resetButtonText = 'Clear';
    @Input() focusSearchbar = false;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    @Output() onInfiniteScroll: EventEmitter<any> = new EventEmitter();
    @Output() onOpen: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @ContentChild(SelectSearchableValueTemplateDirective, { read: TemplateRef }) valueTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableItemTemplateDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableLabelTemplateDirective, { read: TemplateRef }) labelTemplate: TemplateRef<any>;
    @ContentChild(SelectSearchableTitleTemplateDirective, { read: TemplateRef }) titleTemplate: TemplateRef<any>;

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
        this.value = this.multiple ? selectedItem || [] : selectedItem;
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
            text: this.filterText
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
        this._isMd = this.platform.is('android');
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
            if (self._isOpened) {
                // Don't use reject() as if throws an error.
                resolve();
                return;
            }

            self._isOpened = true;
            self._modal = self.modalController.create(SelectSearchablePageComponent, {
                selectComponent: self
            });
            self._modal.present().then(() => {
                resolve();
            });
        });
    }

    public close(): Promise<any> {
        let self = this;

        return new Promise(function (resolve, reject) {
            if (!self._isOpened) {
                // Don't use reject() as if throws an error.
                resolve();
                return;
            }

            self._isOpened = false;
            self._modal.dismiss().then(() => {
                resolve();
            });
        });
    }

    public reset() {
        this.setValue(this.multiple ? [] : null);
    }
}
