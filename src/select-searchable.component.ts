import {
    Component, Input, Output, EventEmitter, Optional, OnInit, OnDestroy, forwardRef, HostListener, OnChanges,
    SimpleChanges, ContentChild, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Item, Form, NavController, Platform, InfiniteScroll } from 'ionic-angular';
import { SelectSearchablePage } from './select-searchable-page.component';
// import { SelectSearchableTitleTemplateDirective } from './select-searchable-title-template.component';

@Component({
    selector: 'select-searchable',
    template: `
        <div class="select-searchable-label">
            {{title}}
            <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
        </div>
        <div class="select-searchable-value">{{formatValue()}}</div>
        <div class="select-searchable-icon">
            <div class="select-searchable-icon-inner"></div>
        </div>
        <button aria-haspopup="true" ion-button="item-cover" class="item-cover"></button>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectSearchable),
        multi: true
    }],
    host: {
        'class': 'select-searchable',
        '[class.select-searchable-ios]': 'isIos',
        '[class.select-searchable-md]': 'isMd',
        '[class.select-searchable-can-reset]': 'canReset',
        '[class.select-searchable-is-enabled]': 'isEnabled'
    }
})
export class SelectSearchable implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    private _items: any[] = [];
    private isIos: boolean;
    private isMd: boolean;
    private _useSearch = true;
    private _isEnabled = true;
    filterText = '';
    value: any = null;
    // @ContentChild(SelectSearchableTitleTemplateDirective, { read: TemplateRef }) titleTemplate;
    get hasSearch(): boolean {
        return this.useSearch && this.onSearch.observers.length > 0;
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
    @Input() title: string;
    @Input() searchPlaceholder: string;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    @Output() onInfiniteScroll: EventEmitter<any> = new EventEmitter();
    @Input() itemTemplate: Function;
    @Input() multiple: boolean;
    @Input() noItemsFoundText = 'No items found.';
    @Input() resetButtonText = 'Clear';

    constructor(
        private navController: NavController,
        private ionForm: Form,
        private platform: Platform,
        @Optional() private ionItem: Item
    ) { }

    isNullOrWhiteSpace(value: any): boolean {
        if (value === null || value === undefined) {
            return true;
        }

        // Convert value to string in case if it's not.
        return value.toString().replace(/\s/g, '').length < 1;
    }

    ngOnInit() {
        this.isIos = this.platform.is('ios');
        this.isMd = this.platform.is('android');
        this.ionForm.register(this);

        if (this.ionItem) {
            this.ionItem.setElementClass('item-select-searchable', true);
        }

        this.enableIonItem(this.isEnabled);
    }

    initFocus() { }

    @HostListener('click', ['$event'])
    _click(event: UIEvent) {
        if (!this.isEnabled || event.detail === 0) {
            // Don't continue if the click event came from a form submit.
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.open();
    }

    enableIonItem(isEnabled: boolean) {
        if (!this.ionItem) {
            return;
        }

        this.ionItem.setElementClass('item-select-searchable-is-enabled', isEnabled);
    }

    select(selectedItem: any) {
        this.value = selectedItem;
        this.emitChange();
    }

    emitChange() {
        this.propagateChange(this.value);
        this.onChange.emit({
            component: this,
            value: this.value
        });
    }

    emitSearch(infiniteScroll: InfiniteScroll) {
        this.onSearch.emit({
            component: this,
            infiniteScroll: infiniteScroll,
            text: this.filterText
        });
    }

    open() {
        this.navController.push(SelectSearchablePage, {
            selectComponent: this,
            navController: this.navController
        });
    }

    reset() {
        this.setValue(null);
        this.emitChange();
    }

    formatItem(value: any): string {
        if (this.itemTemplate) {
            return this.itemTemplate(value);
        }

        if (this.isNullOrWhiteSpace(value)) {
            return null;
        }

        return this.itemTextField ? value[this.itemTextField] : value.toString();
    }

    formatValue(): string {
        if (!this.value) {
            return null;
        }

        if (this.multiple) {
            return this.value.map(item => this.formatItem(item)).join(', ');
        } else {
            return this.formatItem(this.value);
        }
    }

    private propagateChange = (_: any) => { }

    writeValue(value: any) {
        this.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }

    setDisabledState(isDisabled: boolean) { }

    ngOnDestroy() {
        this.ionForm.deregister(this);
    }

    setValue(value: any) {
        this.value = value;

        // Get an item from the list for value.
        // We need this in case value contains only id, which is not sufficient for template rendering.
        if (this.value && !this.isNullOrWhiteSpace(this.value[this.itemValueField])) {
            let selectedItem = this.items.find(item => {
                return item[this.itemValueField] === this.value[this.itemValueField];
            });

            if (selectedItem) {
                this.value = selectedItem;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['items'] && this.items.length > 0) {
            this.setValue(this.value);
        }
    }
}
