import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Content, InfiniteScroll, NavParams, Platform, Searchbar, ViewController } from 'ionic-angular';
import { SelectSearchableComponent } from './select-searchable.component';

@Component({
    selector: 'select-searchable-page',
    template: `
        <ion-header>
            <ion-navbar [color]="selectComponent.headerColor ? selectComponent.headerColor : null">
                <ion-title>
                    <div *ngIf="selectComponent.titleTemplate"
                        [ngTemplateOutlet]="selectComponent.titleTemplate">
                    </div>
                    <div *ngIf="!selectComponent.titleTemplate">
                        {{selectComponent._labelText}}
                    </div>
                </ion-title>
                <ion-buttons start>
                    <button ion-button (click)="close()">
                        <span ion-text showWhen="ios">
                            {{selectComponent.closeButtonText}}
                        </span>
                        <ion-icon name="md-close" hideWhen="ios"></ion-icon>
                    </button>
                </ion-buttons>
            </ion-navbar>
            <ion-toolbar *ngIf="selectComponent.canSearch || selectComponent.messageTemplate">
                <ion-searchbar
                    *ngIf="selectComponent.canSearch"
                    #searchbarComponent
                    [(ngModel)]="selectComponent._filterText"
                    (ionInput)="_filterItems()"
                    [placeholder]="selectComponent.searchPlaceholder || 'Search'"
                    [debounce]="selectComponent.searchDebounce">
                </ion-searchbar>
                <div class="select-searchable-page-message" *ngIf="selectComponent.messageTemplate">
                    <div [ngTemplateOutlet]="selectComponent.messageTemplate">
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="select-searchable-spinner" *ngIf="selectComponent._isSearching">
                <div class="select-searchable-spinner-background"></div>
                <ion-spinner></ion-spinner>
            </div>
            <ion-list no-margin *ngIf="!selectComponent.hasVirtualScroll && _filteredGroups.length">
                <ion-item-group *ngFor="let group of _filteredGroups"
                    class="select-searchable-group">
                    <ion-item-divider *ngIf="selectComponent._hasGroups"
                        [color]="selectComponent.groupColor ? selectComponent.groupColor : null">
                        <div *ngIf="selectComponent.groupTemplate"
                            [ngTemplateOutlet]="selectComponent.groupTemplate"
                            [ngTemplateOutletContext]="{ group: group }">
                        </div>
                        <div *ngIf="!selectComponent.groupTemplate">
                            {{group.text}}
                        </div>
                        <div *ngIf="selectComponent.groupRightTemplate" item-right>
                            <div [ngTemplateOutlet]="selectComponent.groupRightTemplate"
                                [ngTemplateOutletContext]="{ group: group }">
                            </div>
                        </div>
                    </ion-item-divider>
                    <button ion-item detail-none *ngFor="let item of group.items" (click)="select(item)"
                        class="select-searchable-item"
                        [ngClass]="{
                            'select-searchable-item-is-selected': _isItemSelected(item),
                            'select-searchable-item-is-disabled': _isItemDisabled(item)
                        }"
                        [disabled]="_isItemDisabled(item)">
                        <ion-icon
                            [name]="_isItemSelected(item) ? 'checkmark-circle' : 'radio-button-off'"
                            [color]="_isItemSelected(item) ? 'primary' : 'daek'"
                            item-left>
                        </ion-icon>
                        <div *ngIf="selectComponent.itemTemplate"
                            [ngTemplateOutlet]="selectComponent.itemTemplate"
                            [ngTemplateOutletContext]="{ item: item }">
                        </div>
                        <div *ngIf="!selectComponent.itemTemplate">
                            {{selectComponent._formatItem(item)}}
                        </div>
                        <div *ngIf="selectComponent.itemRightTemplate" item-right>
                            <div [ngTemplateOutlet]="selectComponent.itemRightTemplate"
                                [ngTemplateOutletContext]="{ item: item }">
                            </div>
                        </div>
                    </button>
                </ion-item-group>
            </ion-list>
            <ion-infinite-scroll
                *ngIf="!selectComponent.hasVirtualScroll"
                [enabled]="selectComponent.hasInfiniteScroll"
                (ionInfinite)="_getMoreItems($event)">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
            <ion-list no-margin *ngIf="selectComponent.hasVirtualScroll"
                [virtualScroll]="_filteredGroups[0].items"
                [approxItemHeight]="selectComponent.virtualScrollApproxItemHeight"
                [approxItemWidth]="selectComponent.virtualScrollApproxItemWidth"
                [bufferRatio]="selectComponent.virtualScrollBufferRatio"
                [headerFn]="selectComponent.virtualScrollHeaderFn">
                <ion-item-divider *virtualHeader="let header"
                    [color]="selectComponent.groupColor ? selectComponent.groupColor : null">
                    {{header}}
                </ion-item-divider>
                <button ion-item detail-none *virtualItem="let item" (click)="select(item)"
                    class="select-searchable-item"
                    [ngClass]="{
                        'select-searchable-item-is-selected': _isItemSelected(item),
                        'select-searchable-item-is-disabled': _isItemDisabled(item)
                    }"
                    [disabled]="_isItemDisabled(item)">
                    <ion-icon
                        [name]="_isItemSelected(item) ? 'checkmark-circle' : 'radio-button-off'"
                        [color]="_isItemSelected(item) ? 'primary' : 'daek'"
                        item-left>
                    </ion-icon>
                    <div *ngIf="selectComponent.itemTemplate"
                        [ngTemplateOutlet]="selectComponent.itemTemplate"
                        [ngTemplateOutletContext]="{ item: item }">
                    </div>
                    <div *ngIf="!selectComponent.itemTemplate">
                        {{selectComponent._formatItem(item)}}
                    </div>
                    <div *ngIf="selectComponent.itemRightTemplate" item-right>
                        <div [ngTemplateOutlet]="selectComponent.itemRightTemplate"
                            [ngTemplateOutletContext]="{ item: item }">
                        </div>
                    </div>
                </button>
            </ion-list>
            <div *ngIf="!_filteredGroups.length" margin>{{selectComponent.noItemsFoundText}}</div>
        </ion-content>
        <ion-footer *ngIf="selectComponent.canReset || selectComponent.isMultiple">
            <ion-toolbar padding>
                <ion-row>
                    <ion-col no-padding *ngIf="selectComponent.canReset"
                        [attr.col-6]="selectComponent.canReset && selectComponent.isMultiple ? '' : null"
                        [attr.col-12]="selectComponent.canReset && !selectComponent.isMultiple ? '' : null">
                        <button ion-button full no-margin (click)="reset()" [disabled]="!selectedItems.length">
                            {{selectComponent.resetButtonText}}
                        </button>
                    </ion-col>
                    <ion-col no-padding *ngIf="selectComponent.isMultiple"
                        [attr.col-6]="selectComponent.canReset && selectComponent.isMultiple ? '' : null"
                        [attr.col-12]="!selectComponent.canReset && selectComponent.isMultiple ? '' : null">
                        <button ion-button full no-margin (click)="ok()"
                            [disabled]="!selectComponent.isOkButtonEnabled">
                            {{selectComponent.okButtonText}}
                        </button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    `
})
export class SelectSearchablePageComponent implements OnInit, AfterViewInit {
    @HostBinding('class.select-searchable-page')
    private _cssClass = true;
    @HostBinding('class.select-searchable-page-can-reset')
    private get _canResetCssClass(): boolean {
        return this.selectComponent.canReset;
    }
    @HostBinding('class.select-searchable-page-is-multiple')
    private get _isMultipleCssClass(): boolean {
        return this.selectComponent.isMultiple;
    }
    @HostBinding('class.select-searchable-page-is-searching')
    private get _isSearchingCssClass(): boolean {
        return this.selectComponent._isSearching;
    }
    @HostBinding('class.select-searchable-page-ios')
    private _isIos: boolean;
    @HostBinding('class.select-searchable-page-md')
    private _isMD: boolean;
    private _filteredGroups: any[];
    selectedItems: any[] = [];
    infiniteScroll: InfiniteScroll;
    selectComponent: SelectSearchableComponent;
    @ViewChild('searchbarComponent')
    searchbarComponent: Searchbar;
    @ViewChild(Content) _content: Content;

    constructor(
        private navParams: NavParams,
        private viewController: ViewController,
        private platform: Platform
    ) {
        this.selectComponent = this.navParams.get('selectComponent');
        this.selectComponent._selectPageComponent = this;
        this._filteredGroups = this.selectComponent._groups;
        this._filterItems();

        if (!this.selectComponent._isNullOrWhiteSpace(this.selectComponent.value)) {
            if (this.selectComponent.isMultiple) {
                this.selectComponent.value.forEach(item => {
                    this.selectedItems.push(item);
                });
            } else {
                this.selectedItems.push(this.selectComponent.value);
            }
        }

        this._setItemsToConfirm(this.selectedItems);
    }

    ngOnInit() {
        this._isIos = this.platform.is('ios');
        this._isMD = !this._isIos;
    }

    ngAfterViewInit() {
        if (this.searchbarComponent && this.selectComponent.focusSearchbar) {
            // Focus after a delay because focus doesn't work without it.
            setTimeout(() => {
                this.searchbarComponent.setFocus();
            }, 1000);
        }
    }

    private _setItemsToConfirm(items: any[]) {
        // Return a copy of original array, so it couldn't be changed from outside.
        this.selectComponent._itemsToConfirm = [].concat(items);
    }

    private _isItemDisabled(item: any): boolean {
        if (!this.selectComponent.disabledItems) {
            return;
        }

        return this.selectComponent.disabledItems.some(_item => {
            return this.selectComponent._getItemValue(_item) === this.selectComponent._getItemValue(item);
        });
    }

    private _isItemSelected(item: any) {
        return this.selectedItems.find(selectedItem => {
            return this.selectComponent._getItemValue(item) ===
                this.selectComponent._getStoredItemValue(selectedItem);
        }) !== undefined;
    }

    private _deleteSelectedItem(item: any) {
        let itemToDeleteIndex;

        this.selectedItems.forEach((selectedItem, itemIndex) => {
            if (
                this.selectComponent._getItemValue(item) ===
                this.selectComponent._getStoredItemValue(selectedItem)
            ) {
                itemToDeleteIndex = itemIndex;
            }
        });

        this.selectedItems.splice(itemToDeleteIndex, 1);
    }

    private _addSelectedItem(item: any) {
        if (this.selectComponent._shouldStoreItemValue) {
            this.selectedItems.push(this.selectComponent._getItemValue(item));

        } else {
            this.selectedItems.push(item);
        }
    }

    private _filterItems() {
        if (this.selectComponent._hasSearch()) {
            // Delegate filtering to the event.
            this.selectComponent._emitSearch(this.infiniteScroll);
        } else {
            // Default filtering.
            let groups = [];

            if (!this.selectComponent._filterText || !this.selectComponent._filterText.trim()) {
                groups = this.selectComponent._groups;
            } else {
                let filterText = this.selectComponent._filterText.trim().toLowerCase();

                this.selectComponent._groups.forEach(group => {
                    let items = group.items.filter(item => {
                        let itemText = (this.selectComponent.itemTextField ?
                            item[this.selectComponent.itemTextField] : item).toString().toLowerCase();
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
        }
    }

    private _getMoreItems(infiniteScroll: InfiniteScroll) {
        // TODO: Try to get infiniteScroll via ViewChild. Maybe it works in a newer Ionic version.
        // For now assign it here.
        this.infiniteScroll = infiniteScroll;

        this.selectComponent.onInfiniteScroll.emit({
            component: this.selectComponent,
            infiniteScroll: infiniteScroll,
            text: this.selectComponent._filterText
        });
    }

    select(item: any) {
        if (this.selectComponent.isMultiple) {
            if (this._isItemSelected(item)) {
                this._deleteSelectedItem(item);
            } else {
                this._addSelectedItem(item);
            }

            this._setItemsToConfirm(this.selectedItems);
        } else {
            if (!this._isItemSelected(item)) {
                this.selectedItems = [];
                this._addSelectedItem(item);

                if (this.selectComponent._shouldStoreItemValue) {
                    this.selectComponent._select(this.selectComponent._getItemValue(item));
                } else {
                    this.selectComponent._select(item);
                }
            }

            this.close();
        }
    }

    ok() {
        this.selectComponent._select(this.selectedItems);
        this.close();
    }

    close() {
        // Focused input interferes with the animation.
        // Blur it first, wait a bit and then close the page.
        if (this.searchbarComponent) {
            this.searchbarComponent._fireBlur();
        }

        setTimeout(() => {
            this.selectComponent.close().then(() => {
                this.selectComponent.onClose.emit({
                    component: this.selectComponent
                });
            });

            if (!this.selectComponent._hasSearch()) {
                this.selectComponent._filterText = '';
            }
        });
    }

    reset() {
        this.selectComponent.reset();
        this.selectComponent._emitChange();
        this.selectComponent.close().then(() => {
            this.selectComponent.onClose.emit({
                component: this.selectComponent
            });
        });
    }
}
